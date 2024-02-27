const template = document.createElement('template')
template.innerHTML = 
`<article>
    <section class="author"></section>
    <section class="rating"></section>
    <section class="content">
            <blockquote></blockquote>
    </section>
</article>`

export class Review extends HTMLElement {
    constructor() {
        super()
        this.dom = template.content.cloneNode(true)
        this.article = this.dom.querySelector('article')
        this.author = this.dom.querySelector('.author')
        this.rating = this.dom.querySelector('.rating')
        this.content = this.dom.querySelector('.content blockquote')
    }

    update(model) {
        const renderStars = rating => {
            const star = '<span class="star"></span>'
            return Array(rating).fill(star).join('')
        }
        this.article.setAttribute('id', model.id) 
        this.article.setAttribute('source', model.source)
        this.author.textContent = model.name
        this.rating.innerHTML = renderStars(model.rating)
        this.rating.setAttribute('aria-label', model.rating)
        this.content.textContent = model.content
        this.replaceChildren(this.dom)
    }
}

export const find = (function() {
    const handleContent = handler => content => 
        handler.predicate(content) 
            ? handler.onSuccess(content) 
            : handler.onInvalidContent(content)

    const handleResponse = (response, handler) => {
        const httpStartingErrorCode = 400
        return response.status < httpStartingErrorCode 
            ? response.json().then(handleContent(handler))
            : Promise.resolve(handler.onServiceError(response.status))
    }

    return (httpClient, uri) => handler => 
            httpClient(uri)
                .then(res => handleResponse(res, handler))
                .catch(message => Promise.resolve(handler.onServiceUnreachable(message)))
})()

const handlerDoNothingWhenError = {
    onInvalidContent: content => console.error(content),
    onServiceError: httpCode => console.error(`Reviews service responded with http error code ${httpCode}`),
    onServiceUnreachable: message => console.error(`Review service is unreachable. Cause: ${message}`),
}

export const RandomReview = (reviewTagName, httpClient, uri) => 
    class extends HTMLElement {
    constructor() {
        super()
        if (!customElements.get(reviewTagName)) {
            customElements.define(reviewTagName, Review)
        }
    }

    async connectedCallback() {
        find(httpClient, uri)({
            ...handlerDoNothingWhenError,
            predicate: review => review !== null,
            onSuccess: review => {
                const reviewEl = document.createElement(reviewTagName)
                reviewEl.update(review)
                this.replaceChildren(reviewEl)
            }
        })
    }
}

export const AllReviews = (reviewTagName, httpClient, uri) => 
    class extends HTMLElement {
    constructor() {
        super()
        if (!customElements.get(reviewTagName)) {
            customElements.define(reviewTagName, Review)
        }
    }

    async connectedCallback() {
        await find(httpClient, uri)({ 
            ...handlerDoNothingWhenError,
            predicate: reviews => reviews.length > 0, 
            onSuccess: reviews => {
                this.ulEl = document.createElement('ul')
                this.ulEl.replaceChildren(...reviews.map(this.renderListItem.bind(this)))
                this.replaceChildren(this.ulEl)
            }})
    }

    renderListItem(review) {
        const reviewEl = document.createElement(reviewTagName)
        reviewEl.classList.add('list-item')
        reviewEl.update(review)
        const liEl = document.createElement('li')
        liEl.appendChild(reviewEl)
        return liEl
    }
}

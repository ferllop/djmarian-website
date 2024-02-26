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
    
    connectedCallback() {
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

export const DefaultReviewsService = (function() {
    const handleResponse = (response, dataWhenFetchFails) => {
        const responseIsOk = (httpCode) => httpCode < 400
        return responseIsOk(response.status) 
            ? response.json()
            : Promise.resolve(dataWhenFetchFails)
    }

    return {
        getAllReviews: httpClient => 
            () => httpClient('/all-reviews')
                .then(res => handleResponse(res, []))
                .catch(() => Promise.resolve([])),

        getRandomReview: httpClient =>
            () => httpClient('/random-review')
                .then(res => handleResponse(res, null))
                .catch(() => Promise.resolve(null)),
    }
})()

export const RandomReview = (reviewTagName, fetchRandomReviewFunction) => 
    class extends HTMLElement {
    constructor() {
        super()
        if (!customElements.get(reviewTagName)) {
            customElements.define(reviewTagName, Review)
        }
    }

    async connectedCallback() {
        const review = await fetchRandomReviewFunction()
        if (review !== null) {
            const reviewEl = document.createElement(reviewTagName)
            reviewEl.update(review)
            this.replaceChildren(reviewEl)
        }
    }
}

export const AllReviews = (reviewTagName, fetchAllReviewsFunction) => 
    class extends HTMLElement {
    constructor() {
        super()
        if (!customElements.get(reviewTagName)) {
            customElements.define(reviewTagName, Review)
        }
    }

    async connectedCallback() {
        const reviews = await fetchAllReviewsFunction()
        if (reviews.length > 0) {
            this.ulEl = document.createElement('ul')
            this.ulEl.replaceChildren(...reviews.map(this.renderListItem.bind(this)))
            this.replaceChildren(this.ulEl)
        }
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

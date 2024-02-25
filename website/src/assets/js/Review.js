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

export const ReviewsService = (httpClient) => ({
    async getAllReviews() {
        return httpClient('/all-reviews')
            .then(res => this.handleResponse(res, [])) 
    },

    async getRandomReview() {
        return httpClient('/random-review')
            .then(res => this.handleResponse(res, null))
    },

    async handleResponse(response, dataWhenFetchFails) {
        const responseIsOk = (httpCode) => httpCode < 400
        return responseIsOk(response.status) 
            ? response.json()
            : Promise.resolve(dataWhenFetchFails)
    }
})

export class RandomReview extends HTMLElement {
    get reviewsService() {
        return ReviewsService(fetch)
    }

    get reviewTagName() {
        return 'djm-review'
    }

    constructor() {
        super()
        if (!customElements.get(this.reviewTagName)) {
            customElements.define(this.reviewTagName, Review)
        }
    }

    async connectedCallback() {
        const review = await this.reviewsService.getRandomReview()
        if (review !== null) {
            const reviewEl = document.createElement(this.reviewTagName)
            reviewEl.update(review)
            this.replaceChildren(reviewEl)
        }
    }
}

export class AllReviews extends HTMLElement {
    get reviewsService() {
        return ReviewsService(fetch)
    }

    get reviewTagName() {
        return 'djm-review'
    }

    constructor() {
        super()
        if (!customElements.get(this.reviewTagName)) {
            customElements.define(this.reviewTagName, Review)
        }
        this.ulEl = document.createElement('ul')
        this.replaceChildren(this.ulEl)
    }

    async connectedCallback() {
        const reviews = await this.reviewsService.getAllReviews()
        if (reviews.length > 0) {
            this.ulEl.replaceChildren(...reviews.map(this.renderListItem.bind(this)))
        }
    }

    renderListItem(review) {
        const reviewEl = document.createElement(this.reviewTagName)
        reviewEl.classList.add('list-item')
        reviewEl.update(review)
        const liEl = document.createElement('li')
        liEl.appendChild(reviewEl)
        return liEl
    }
}

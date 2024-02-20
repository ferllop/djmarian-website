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
    set model(model) {
        const renderStars = rating => {
            const star = '<span class="star"></span>'
            return Array(rating).fill(star).join('')
        }
        this.replaceChildren(template.content.cloneNode(true))
        this.article = this.querySelector('article')
        this.author = this.querySelector('.author')
        this.rating = this.querySelector('.rating')
        this.content = this.querySelector('.content blockquote')
        this.article.setAttribute('id', model.id) 
        this.article.setAttribute('source', model.source)
        this.author.textContent = model.name
        this.rating.innerHTML = renderStars(model.rating)
        this.rating.setAttribute('aria-label', model.rating)
        this.content.textContent = model.content
    }
}

const ReviewsService = {
    async getAllReviews() {
        return fetch('/all-reviews').then(res => res.json())
    },

    async getRandomReview() {
        return fetch('/random-review').then(res => res.json())
    }
}

export class RandomReview extends HTMLElement {
    constructor() {
        super()
        if (!customElements.get('djm-review')) {
            customElements.define('djm-review', Review)
        }
    }

    async connectedCallback() {
        const reviewEl = document.createElement('djm-review')
        const review = await ReviewsService.getRandomReview()
        reviewEl.model = review
        this.replaceChildren(reviewEl)
    }
}

export class AllReviews extends HTMLElement {
    constructor() {
        super()
        if (!customElements.get('djm-review')) {
            customElements.define('djm-review', Review)
        }
    }

    async connectedCallback() {
        this.replaceChildren()
        const reviews = await ReviewsService.getAllReviews()
        this.replaceChildren(...reviews.map(review => { 
            const reviewEl = document.createElement('djm-review')
            reviewEl.model = review
            const wrapper = document.createElement('div')
            wrapper.classList.add('one-of-many')
            wrapper.appendChild(reviewEl)
            return wrapper
        }))
    }
}

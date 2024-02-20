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
        this.replaceChildren(this.dom)
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
        const review = await ReviewsService.getRandomReview()
        const reviewEl = document.createElement('djm-review')
        reviewEl.update(review)
        this.replaceChildren(reviewEl)
    }
}

export class AllReviews extends HTMLElement {
    constructor() {
        super()
        if (!customElements.get('djm-review')) {
            customElements.define('djm-review', Review)
        }
        this.ulEl = document.createElement('ul')
        this.replaceChildren(this.ulEl)
    }

    async connectedCallback() {
        const reviews = await ReviewsService.getAllReviews()
        this.ulEl.replaceChildren(...reviews.map(this.renderListItem))
    }

    renderListItem(review) {
        const reviewEl = document.createElement('djm-review')
        reviewEl.classList.add('list-item')
        reviewEl.update(review)
        const liEl = document.createElement('li')
        liEl.appendChild(reviewEl)
        return liEl
    }
}

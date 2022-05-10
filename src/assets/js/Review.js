import {ReviewsCollection} from './ReviewsCollection.js'

export class Review extends HTMLElement {
    get index() {
        return Number.parseInt(this.getAttribute('index'))
    }

    constructor() {
        super()
        this.attachShadow({mode: 'open'})
    }

    async connectedCallback() {
        await this.updateReview()
    }

    async updateReview() {
        const reviews = this.getAttribute('reviews')
        const reviewsCollection = new ReviewsCollection(reviews)
        const review = await this.#getReviewFromCollection(reviewsCollection)
        review && this.#renderOneReview(review)
    }

    async #getReviewFromCollection(collection) {
        const hasIndex = !Number.isNaN(this.index)
        if (hasIndex) {
            return await collection.isIndexCorrect(this.index)
                ? collection.getReview(this.index)
                : null
        }
        return collection.getRandomReview()
    }

    #renderOneReview(review) {
        const template = document.createElement('template')
        template.innerHTML = `<article class="review"
                    data-rating="${review.rating}"
                    data-source="${review.source}">
                <section class="name">${review.name} -</section>
                <section class="rating">
                    ${this.#renderStars(review.rating)}
                </section>
                <section class="text">
                    <blockquote>${review.content}</blockquote>
                </section>
        </article>`
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    #renderStars(rating) {
        let result = ''
        for (let i = 0; i < rating; i++) {
            result += `<span class="star">*</span>`
        }
        return result
    }
}


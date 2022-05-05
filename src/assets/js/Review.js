class ReviewsCollection {
    #reviews = []

    constructor(reviews) {
        this.#reviews = reviews
    }

    getRandomReview() {
        const min = 0
        const max = this.#reviews.length
        const randomIndex = Math.floor(Math.random() * (max - min)) + min
        return this.getReview(randomIndex)
    }

    getReview(index) {
        return this.#reviews[index]
    }

    get length() {
        return this.#reviews.length
    }
}

export class Review extends HTMLElement {
    async connectedCallback() {
        const review = await this.getReview()
        this.innerHTML = this.renderOneReview(review)
    }

    renderOneReview(review) {
        return `
            <article class="review"
                    data-rating="${review.rating}"
                    data-source="${review.source}">
                <section class="name">${review.name} -</section>
                <section class="rating">
                    ${this.renderStars(review.rating)}
                </section>
                <section class="text">
                    <blockquote>${review.content}</blockquote>
                </section>
        </article>`
    }

    async getReview() {
        const index = Number.parseInt(this.getAttribute('index'))
        const reviews = new ReviewsCollection(await this.fetchReviews())
        if (index) {
            if (Number.isNaN(index)) {
                throw new Error('You must provide a number as index')
            }
            if (index < 0) {
                throw new Error('You must provide a positive index')
            }
            if (index >= reviews.length) {
                throw new Error('The provided index is greater than the available reviews')
            }
        }
        return index
            ? reviews.getReview(index)
            : reviews.getRandomReview()
    }

    async fetchReviews() {
        const reviews = await fetch(new URL('reviews.json', import.meta.url))
        return reviews.json()
    }

    renderStars(rating) {
        let result = ''
        for (let i = 0; i < rating; i++) {
            result += '<span class="star">*</span>'
        }
        return result
    }
}
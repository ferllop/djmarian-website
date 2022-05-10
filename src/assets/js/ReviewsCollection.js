export class ReviewsCollection {
    #reviews = []

    constructor(reviews) {
        this.#reviews = JSON.parse(reviews)
    }

    async getRandomReview() {
        const min = 0
        const max = await this.reviewsQuantity() - 1
        const randomIndex = Math.floor(Math.random() * (max - min)) + min
        return this.getReview(randomIndex)
    }

    async getReview(index) {
        await this.assertIsIndexCorrect(index)
        return (await this.#getReviews())[index]
    }

    async reviewsQuantity() {
        return (await this.#getReviews()).length
    }

    async isIndexCorrect(index) {
        return !Number.isNaN(index)
            && index >= 0
            && index < await this.reviewsQuantity()
    }

    async assertIsIndexCorrect(index) {
        if (await this.isIndexCorrect()) {
            return
        }
        if (Number.isNaN(index)) {
            throw new Error('You must provide a number as index')
        }
        if (index < 0) {
            throw new Error('You must provide a positive index')
        }
        if (index >= await this.reviewsQuantity()) {
            throw new Error('The provided index is greater than the available reviews')
        }
    }

    async #getReviews() {
        if (this.#reviews === null) {
            this.#reviews = await this.#fetchReviews()
        }
        return this.#reviews
    }

    async #fetchReviews() {
        return (await fetch(new URL('reviews.json', import.meta.url).toString())).json()
    }
}
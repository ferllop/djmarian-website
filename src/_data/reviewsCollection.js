class ReviewsCollection {
    #reviews = []

    constructor(jsonReviews) {
        this.#reviews = jsonReviews
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
}

module.exports = {
    getRandomReview(reviews) {
        return new ReviewsCollection(reviews).getRandomReview()
    },
}
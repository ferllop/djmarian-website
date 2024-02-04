function xReviews(quantity) {
    const reviews = []
    for (let i = 1; i <= quantity; i++) {
        reviews.push({
            id: i,
            name: 'TheName' + i,
            rating: 5,
            content: 'The Content' + i,
        })
    }
    return JSON.stringify(reviews)
}

export function anyReviews() {
    return someReviews()
}

export function someReviews(qty) {
    return xReviews(qty ?? 3)
}
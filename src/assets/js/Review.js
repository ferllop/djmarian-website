import {ReviewsCollection} from './ReviewsCollection.js'

const style = `
article {
    text-align: start;
    max-width: 800px;
    margin: 0 auto;
}

.star {
    vertical-align: baseline;
    display: inline-block;
    width: 15px;
    height: 14px;
    margin: 0 1px;
    background-size: 15px 14px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAABkklEQVR4Ac2Wu6oTQRzGf2JlZ+sFBbVRLMQXEJ9B0mgjgiEm+x8QtBC00FR5A5/B0kfQiIKNhcQmRDCSZGfgtOcU4Vw+SCCE3ZO9c37wwTD/y8fMsLNDUUKbSxJN4x0mNW9sDL3jK03y37gajENp2uEKTREiXgbHkaRxc8aOH2tjb3ynCWY9rq9NJW235qib2Hi9aSzFjlfUTTB+bhtrjjqJX3BDRklSrMg3+exEX3YpGH/SjBXL0kNe21v43BsHalKHvLEvD5IIPe57Y1KD6US9OY2/T7kYjM9VmaqXepKRc97xJhjLEoZL9VAv8jJ3PPSORV5T1aiWMvyLuOyNb1lNlauaqu7mQY4VD6r8945zrHhcjWmXe3nPWDVVrLafdiFIKbF+Fec7SvhUfi863JU0TjAfUYZZl9sJph+nLS6wQmPNbefNjTtltvnthuFeHPGIFBRTzsaT6F0Z41+rMxvO2lxjB8rRy1M1qi360ripay92fPjU4jwZUW5svFet73KLvCwiHgfjAQVRbWw84axxDHyajlb+vInhAAAAAElFTkSuQmCC);
    background-repeat: no-repeat;
}

.name {
    display: inline-block;
    font-weight: bold;
    font-size: 1.2em;
    padding-top: 10px;
}

.name::after {
    display: inline;
    content: "-";
    margin: 0 0.5ch;
}

.rating {
    display: inline-block;
}

.content {
    display: block;
    font-style: italic;
    opacity: 0.9;
    letter-spacing: 0.028em;
    line-height: 1.4;
    padding-top: 1.1em;
    padding-bottom: 1.1em;
    margin-bottom: 0;
    border: none;
}

.source {
    font-size: 1em;
    font-weight: bold;
    padding-bottom: 10px;
}

@media screen and (max-width: 570px) {
    .content {
        padding-left:0;
    }
}`

const template = document.createElement('template')
template.innerHTML = `
<style>${style}</style>
<div></div>`

export class Review extends HTMLElement {
    get index() {
        return Number.parseInt(this.getAttribute('index'))
    }

    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
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
        this.shadowRoot.querySelector('div').innerHTML = `
            <article class="review"
                    data-rating="${review.rating}"
                    data-source="${review.source}">
                <section class="name">${review.name}</section>
                <section class="rating">
                    ${this.#renderStars(review.rating)}
                </section>
                <section class="content">
                    <blockquote>${review.content}</blockquote>
                </section>
        </article>`
    }

    #renderStars(rating) {
        let result = ''
        for (let i = 0; i < rating; i++) {
            result += `<span class="star"></span>`
        }
        return result
    }
}


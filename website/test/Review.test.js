import {expect, fixture, html} from '@open-wc/testing'
import {AllReviews, RandomReview, Review, DefaultReviewsService} from '../src/assets/js/Review.js'


const someReviews = quantity => {
    const reviews = []
    for (let i = 1; i <= quantity; i++) {
        reviews.push({
            id: i,
            name: 'TheName' + i,
            rating: 5,
            content: 'The Content' + i,
        })
    }
    return reviews
}

const WithResponse = (klass, data, status = 200) => class extends klass {
    fetchMock(responseData, responseStatus) {
        return () => Promise.resolve({
            status: responseStatus, 
            json: () => Promise.resolve(responseData),
        })
    }

    get reviewTagName() {
        return 'test-review'
    }

    get reviewsService() {
        return DefaultReviewsService(this.fetchMock(data, status))
    }
}
const reviewServiceStub = (responseData, responseStatus = 200) => {
    return () => Promise.resolve({
        status: responseStatus, 
        json: () => Promise.resolve(responseData),
    })
}


describe('Review WebComponent', () => {
    it('should be accessible', async () => {
        customElements.define('test-review', Review)
        const el = await fixture(html`<test-review></test-review>`)
        await expect(el).to.be.accessible()
    })
})

describe('RandomReview Webcomponent', () => {
    it('should render a random review ', async () => {
        customElements.define(
            'random-review', 
            RandomReview('test-review', () => Promise.resolve(someReviews(1)[0])))
        const el = await fixture(html`<random-review></random-review>`)
        expect(el.querySelector('.author').textContent).equals('TheName1')
    })

    it('should leave its content as provided by client \
        when random review is null', async () => {
        customElements.define(
            'failing-random-review', 
            RandomReview('test-review', () => Promise.resolve(null)))
        const el = await fixture(html`<failing-random-review>Some client content</failing-random-review>`)
        expect(el.textContent).equals('Some client content')
        expect(el.querySelector('.author')).equals(null)
    })
})

describe('AllReviews WebComponent', () => {
    it('should render the entire list of reviews', async () => {
        customElements.define(
            'all-reviews', 
            AllReviews('test-review', () => Promise.resolve(someReviews(3))))
        const el = await fixture(html`<all-reviews></all-reviews>`)
        expect(el.querySelectorAll('.author').length).equals(3)
    })
})

describe('DefaultReviewsService', () => {
    it('should return null when fetching a random review but the server responds with an http error code', async () => {
        const sut = DefaultReviewsService.getRandomReview(() => Promise.resolve({
            status: 400, 
            json: () => Promise.resolve('Server responds with an http error code')}))
        const result = await sut()
        expect(result).to.equal(null)
    })
})

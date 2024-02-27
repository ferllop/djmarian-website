import {expect, fixture, html} from '@open-wc/testing'
import {AllReviews, RandomReview, Review, find} from '../src/assets/js/Review.js'

const someReviews = quantity => {
    const reviews = []
    for (let i = 1; i <= quantity; i++) {
        reviews.push({
            id: i,
            source: 'Google',
            name: 'TheName' + i,
            rating: 5,
            content: 'The Content' + i,
        })
    }
    return reviews
}

const oneReview = someReviews(1)[0]

const reviewBuilder = review => `
            <article id="${review.id}" source="${review.source}">
                <section class="author">${review.name}</section>
                <section class="rating" aria-label="${review.rating}">
                    <span class="star"></span>
                    <span class="star"></span>
                    <span class="star"></span>
                    <span class="star"></span>
                    <span class="star"></span>
                </section>
                <section class="content">
                    <blockquote>${review.content}</blockquote>
                </section>
            </article>`


const httpClientStub = (responseData, responseStatus = 200) => {
    return () => Promise.resolve({
        status: responseStatus, 
        json: () => Promise.resolve(responseData),
    })
}

describe('Review WebComponent', () => {
    customElements.define('test-review', Review)
    it('should be accessible', async () => {
        const el = await fixture(html`<test-review></test-review>`)
        await expect(el).to.be.accessible()
    })

    it('given a review data should generate the correct markup', async () => {
        const el = await fixture(html`<test-review></test-review>`)
        el.update(oneReview)
        const expectedHtml = reviewBuilder(oneReview)
        await expect(el).lightDom.to.equal(expectedHtml)
    })
})

describe('RandomReview Webcomponent', () => {
    it('should render a random review ', async () => {
        customElements.define(
            'random-review', 
            RandomReview('test-review', httpClientStub(oneReview)))
        const el = await fixture(html`<random-review></random-review>`)
        expect(el.querySelector('.author')).to.have.text('TheName1')
    })

    it('should leave its content as provided by client \
        when random review is null', async () => {
        customElements.define(
            'failing-random-review', 
            RandomReview('test-review', httpClientStub(null)))
        const el = await fixture(html`<failing-random-review>Some client content</failing-random-review>`)
        expect(el).to.have.text('Some client content')
        expect(el).to.not.have.class('.author')
    })
})

describe('AllReviews WebComponent', () => {
    it('should render the entire list of reviews', async () => {
        customElements.define(
            'all-reviews', 
            AllReviews('test-review', httpClientStub(someReviews(3))))
        const el = await fixture(html`<all-reviews></all-reviews>`)
        expect(el.querySelectorAll('.author')).to.have.length(3)
    })

    it('should leave its content as provided by client \
        when there are no reviews', async () => {
        customElements.define(
            'empty-reviews', 
            AllReviews('test-review', httpClientStub([])))
        const el = await fixture(html`<empty-reviews>Some client content</empty-reviews>`)
        expect(el).to.have.text('Some client content')
        expect(el.querySelector('.author')).not.to.exist
    })
})

describe('find', () => {
    const assertUnreachable = () => { throw new Error('should be unreachable') }
    const id = x => x

    it('given a correct response with a VALID content \
        when fetching any uri \
        then should execute onSuccess function', async () => {
        const contentIsValid = () => true
        const sut = find(httpClientStub('Server responds with valid content', 200))
        let spy = 0
        await sut(contentIsValid, () => spy++, assertUnreachable)
        expect(spy).equals(1)
    })
    
    it('given a correct response with an INVALID content \
        when fetching any uri \
        then should execute onFailure function', async () => {
        const contentIsInvalid = () => false
        const sut = find(httpClientStub('Server responds with invalid content', 200))
        let spy = 0
        await sut(contentIsInvalid, assertUnreachable, () => spy++)
        expect(spy).equals(1)
    })
    
    it('given a server that responds with an http error code \
        when fetching any uri \
        then should execute onFailure function', async () => {
        const httpFirstErrorCode = 400
        const sut = find(httpClientStub('Server responds with an http error code', httpFirstErrorCode))
        let spy = 0
        await sut(id, assertUnreachable, () => spy++)
        expect(spy).equals(1)
    })

    it('given a server that is not reachable \
        when fetching any uri \
        then should execute onFailure function', async () => {
        const sut = find(() => Promise.reject('Server unreachable'))
        let spy = 0
        await sut(id, assertUnreachable, () => spy++)
        expect(spy).equals(1)
    })
})

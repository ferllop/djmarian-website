import {expect, fixture, html} from '@open-wc/testing'
import {Review} from '../src/assets/js/Review.js'
import {anyReviews, someReviews} from './reviewsRenderer.js'
import {ReviewsCollection} from '../src/assets/js/ReviewsCollection.js'

describe('Review WebComponent', ()=> {
    customElements.define('test-review', Review)

    it('should be accessible', async () => {
        const el = await fixture(html`<test-review index="0" reviews=${anyReviews()}></test-review>`)
        await expect(el).to.be.accessible()
    })

    it('should have an index property if index attribute is provided', async () => {
        const el = await fixture(html`<test-review index="0" reviews=${anyReviews()}></test-review>`)
        expect(el.index).to.equal(0)
    })

    it('should render a random review when index is not provided', async () => {
        const el = await fixture(html`<test-review reviews=${someReviews(2)}></test-review>`)
        expect(el.shadowRoot.querySelector('.name')).to.exist
    })

    it('should render the first review when index is 0', async () => {
        const el = await fixture(html`<test-review index="0" reviews=${someReviews(2)}></test-review>`)
        expect(el.shadowRoot.querySelector('.name').innerText).to.include('TheName1')
    })

    it('should render nothing when index is out of superior bound', async () => {
        const el = await fixture(html`<test-review index="1000" reviews=${someReviews(1)}></test-review>`)
        expect(el.shadowRoot.querySelector('.name')).to.not.exist
    })

    it('should render nothing when index is below 0', async () => {
        const el = await fixture(html`<test-review index="-1" reviews=${someReviews()}></test-review>`)
        expect(el.shadowRoot.querySelector('.name')).to.not.exist
    })

    it('should fetch the reviews from the json file if no reviews are provided', async () => {
        const el = await fixture(html`<test-review index="0"></test-review>`)
        expect(el.shadowRoot.querySelector('.name').innerText).to.include('Daniela')
    })
})


describe('ReviewsCollection', () => {
    it('should return the first review when index is 0', async () => {
        const sut = new ReviewsCollection(someReviews())
        const result = await sut.getReview(0)
        expect(result.name).to.equal('TheName1')
    })

    it('should return the last review when there are 2 reviews and index is 1', async () => {
        const sut = new ReviewsCollection(someReviews(2))
        const result = await sut.getReview(1)
        expect(result.name).to.equal('TheName2')
    })

    it('should throw error when index equals or is greater than the reviews quantity', async () => {
        try {
            const sut = new ReviewsCollection(someReviews(2))
            await sut.getReview(2)
            expect.fail('Unreachable')
        } catch (error) {
            expect(error.message).to.be.equal('The provided index is greater than the available reviews')
        }
    })

    it('should throw error when index is below 0', async () => {
        try {
            const sut = new ReviewsCollection(someReviews())
            await sut.getReview(-1)
            expect.fail()
        } catch (error) {
            expect(error.message).to.be.equal('You must provide a positive index')
        }
    })
})

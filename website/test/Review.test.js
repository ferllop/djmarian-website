import {expect, fixture, html} from '@open-wc/testing'
import {AllReviews, RandomReview, Review, ReviewsService} from '../src/assets/js/Review.js'


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
        return ReviewsService(this.fetchMock(data, status))
    }
}

customElements.define('test-review', Review)

describe('Review WebComponent', ()=> {

    it('review component should be accessible', async () => {
        const el = await fixture(html`<test-review></test-review>`)
        await expect(el).to.be.accessible()
    })

    it('random-review component should render a random review ', async () => {
        customElements.define('random-review', WithResponse(RandomReview, someReviews(1)[0]))
        const el = await fixture(html`<random-review></random-review>`)
        expect(el.querySelector('.author').textContent).equals('TheName1')
    })

    it('random-review component should leave its content as provided by client \
        when there is an error fetching the review service', async () => {
        customElements.define('failing-random-review', WithResponse(RandomReview, 'Failure', 400))
        const el = await fixture(html`<failing-random-review>Some client content</failing-random-review>`)
        expect(el.textContent).equals('Some client content')
        expect(el.querySelector('.author')).equals(null)
    })


    it('all-reviews component should render the entire list of reviews', async () => {
        customElements.define('all-reviews', WithResponse(AllReviews, someReviews(3)))
        const el = await fixture(html`<all-reviews></all-reviews>`)
        expect(el.querySelectorAll('.author').length).equals(3)
    })
})


// describe('ReviewsCollection', () => {
//     it('should return the first review when index is 0', async () => {
//         const sut = new ReviewsCollection(someReviews())
//         const result = await sut.getReview(0)
//         expect(result.name).to.equal('TheName1')
//     })

//     it('should return the last review when there are 2 reviews and index is 1', async () => {
//         const sut = new ReviewsCollection(someReviews(2))
//         const result = await sut.getReview(1)
//         expect(result.name).to.equal('TheName2')
//     })

//     it('should throw error when index equals or is greater than the reviews quantity', async () => {
//         try {
//             const sut = new ReviewsCollection(someReviews(2))
//             await sut.getReview(2)
//             expect.fail('Unreachable')
//         } catch (error) {
//             expect(error.message).to.be.equal('The provided index is greater than the available reviews')
//         }
//     })

//     it('should throw error when index is below 0', async () => {
//         try {
//             const sut = new ReviewsCollection(someReviews())
//             await sut.getReview(-1)
//             expect.fail()
//         } catch (error) {
//             expect(error.message).to.be.equal('You must provide a positive index')
//         }
//     })
// })

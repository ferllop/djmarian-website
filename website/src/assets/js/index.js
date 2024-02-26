import {Menu} from './Menu.js'
import { RandomReview } from './Review.js'

async function defineIfPresent(path, tag, klass, ...args) {
    if (document.querySelector(tag)) {
        const file = await import(path)
        if (args) {
            customElements.define(tag, file[klass](...args))
        } else {
            customElements.define(tag, file[klass])
        }
    }
}

defineIfPresent('./Video.js', 'djm-video', 'Video')
defineIfPresent('./Review.js', 'djm-random-review', 'RandomReview', 'djm-review')
// defineIfPresent('./Review.js', 'djm-random-review', 'RandomReview')
defineIfPresent('./Review.js', 'djm-all-reviews', 'AllReviews', 'djm-review')

customElements.define('djm-menu', Menu) 

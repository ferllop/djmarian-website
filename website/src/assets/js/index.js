import {Menu} from './Menu.js'

async function defineIfPresent(tag, path, f) {
    if (document.querySelector(tag)) {
        const file = await import(path)
        customElements.define(tag, f(file))
    }
}

defineIfPresent('djm-video', './Video.js', file => file['Video'])
defineIfPresent(
    'djm-random-review', 
    './Review.js',
    file => file['RandomReview']('djm-review', fetch, '/random-review'))
defineIfPresent(
    'djm-all-reviews', 
    './Review.js', 
    file => file['AllReviews']('djm-review', fetch, '/all-reviews'))

customElements.define('djm-menu', Menu) 

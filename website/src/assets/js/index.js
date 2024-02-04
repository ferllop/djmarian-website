import {Menu} from './Menu.js'

async function defineIfPresent(path, tag, klass) {
    if (document.querySelector(tag)) {
        const file = await import(path)
        customElements.define(tag, file[klass])
    }
}

defineIfPresent('./Video.js', 'djm-video', 'Video') 
defineIfPresent('./Review.js', 'djm-review', 'Review')
customElements.define('djm-menu', Menu) 

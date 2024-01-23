export class Menu extends HTMLElement {
    constructor() {
        super()
        this.menu = this.querySelector('details')
    }

    connectedCallback() {
        const hideSummaryClass = 'hide-summary'
        window.innerWidth < 800 
            ? this.compactMenu(this.menu, hideSummaryClass)
            : this.expandMenu(this.menu, hideSummaryClass)
    }

    compactMenu(menu, hideClass) {
        menu.classList.remove(hideClass)
    }

    expandMenu(menu, hideClass) {
        menu.setAttribute('open', true)
        menu.classList.add(hideClass)
    }
}

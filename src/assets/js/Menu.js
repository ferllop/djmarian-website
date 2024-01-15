export class Menu extends HTMLElement {
    connectedCallback() {
        const hideSummary = 'hide-summary'
        const menu = this.querySelector('details')

        if (window.innerWidth < 800){
            menu.classList.remove(hideSummary)
        } else {
            menu.setAttribute('open', true)
            menu.classList.add(hideSummary)
        }
    }
}

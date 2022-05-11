const template = document.createElement('template')
template.innerHTML = `
<p class="has-text-align-center">
    <span class="red-button">
        <a href="/contacto/">
            <strong><slot></slot></strong>
        </a>
    </span>
</p>`

export class CtoContactaWebComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}
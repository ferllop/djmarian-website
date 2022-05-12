const style = `
a {
    display: inline-block;
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    padding: 6px 24px;
    background-color: #bc3315;
    border: 1px solid #942911;
    border-radius: 6px;
    color: #ffffff;
    line-height: 1.75;
    text-decoration: none;
    cursor: pointer;
}
`
const template = document.createElement('template')
template.innerHTML = `
<style>${style}</style>
        <a href="/contacto/">
            <strong><slot></slot></strong>
        </a>
`

export class CtoContactaWebComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}
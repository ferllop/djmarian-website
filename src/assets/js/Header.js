const style = `

	header {
	    display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-top: 2em;
        padding-bottom: 1.5em;
    	border-bottom: 1px solid var(--main-text-color, black);
	}
	
	a {
		display: block;
	}
`

const template = document.createElement('template')
template.innerHTML = `
<style>${style}</style>
<header>
    <section>
        <a href="/" rel="home">
            <img src="/assets/images/logo-dj-marian.svg"
                 alt="Logo de Dj Marian">
        </a>
    </section>
    <djm-main-menu></djm-main-menu>
</header>`

export class MainHeader extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({mode: 'open'})
	}
	connectedCallback() {
		this.shadowRoot.appendChild(template.content.cloneNode(true))
	}
} 

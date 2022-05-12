const style = `
    nav {
        padding-top: 1em;
        padding-bottom: 1em;
    }
    
    ul {
        display: flex;
        justify-content: center;
        padding-left: 0;
    }
    
    li {
        list-style-type: none;
    }
    
    a {
        padding-left: 1em;
        padding-right: 1em;
    	text-decoration: none;
    	color: inherit;
    }
    
    a:hover {
        color: #007acc;
    }
    
`

export const template = document.createElement('template')
template.innerHTML =`
<style>${style}</style>
<nav>
    <ul>
        <li><a href="/marian-corbalan">¿Quien Soy?</a></li>
        <li><a href="/bodas">Bodas</a></li>
        <li><a href="/eventos-corporativos">Eventos Corporativos</a></li>
        <li><a href="/fiestas-privadas">Fiestas Privadas</a></li>
        <li><a href="/opiniones">Opiniones</a></li>
        <li><a href="/contacto">Contacto</a></li>
    </ul>
</nav>`

export class MainMenu extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}
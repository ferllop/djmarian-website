const style = `
nav {
    margin: auto;
    max-width: 800px;
}

ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2em;
    padding-left: 0;
    list-style: none;
}

a {
    color: black;
    text-decoration: none;
    box-shadow: none
}

a:hover, a:active {
    text-decoration: underline;
}

li {
    --border-radius: 8px;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
}

img {
    border-radius: var(--border-radius) var(--border-radius) 0 0;
}

h3 {
    color: black;
    font-weight: 600;
    font-style: normal;
    font-family: serif;
}`

export const template = document.createElement('template')
template.innerHTML =`
<style>${style}</style>
<nav>
        <ul>
            <li>
                <a href="/bodas/">
                    <img src="/assets/images/djmarian-bodas-275x183.jpg"
                         alt="Páginas de un libro en forma de corazón con un anillo a cada lado">
                    <h3>Boda</h3>
                </a>
            </li>
            <li>
                <a href="/eventos-corporativos/">
                    <img src="/assets/images/djmarian-evento-corporativo-275x183.jpg"
                         alt="Evento corporativo en salón iluminado en rosa">
                    <h3>Evento Corporativo</h3>
                </a>
            </li>
            <li>
                <a href="/fiestas-privadas/">
                    <img src="/assets/images/djmarian-fiestas-privadas-275x183.jpg"
                         alt="Bengala encendida en la oscuridad">
                    <h3>Fiesta Privada</h3>
                </a>
            </li>
            <li>
                <a href="/mezclas-personalizadas/">
                    <img src="/assets/images/djmarian-mezclas-personalizadas-275x183.jpg"
                         alt="Mesa de mezclas de DJ">
                    <h3>Mezcla Personalizada</h3>
                </a>
            </li>
        </ul>
    </nav>`

export class ServicesGallery extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}
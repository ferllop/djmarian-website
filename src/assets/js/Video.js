const template = document.createElement('template')
template.innerHTML = `
<video width="80%" preload="metadata" controls poster="/assets/images/portada-video-djmarian.webp" >
    <track label="Audiodescripción" kind="captions" srclang="es" src="/assets/videos/subtitles/Video-Promocional-Dj-Marian.vtt">
    <source src="/assets/videos/Video-Promocional-Dj-Marian.webm" type="video/webm">
    <source src="/assets/videos/Video-Promocional-Dj-Marian.mp4" type="video/mp4">
    <a target="_blank" 
        rel="noopener" 
        href="https://vimeo.com/237134347">
        ¡Mira mi vídeo promocional en Vimeo!
    </a>
</video>`

export class VideoWebComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}
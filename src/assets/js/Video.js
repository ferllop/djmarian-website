const template = document.createElement('template')
template.innerHTML = `
<!-- [velocity type="vimeo" id="237134347" img="https://djmarian.com/wp/wp-content/uploads/portada-video-djmarian.webp" options="width="300"&height="150"&frameborder="0"&allowfullscreen="allowfullscreen"" alt="Play" color="#FFFFFF" bkg\\_color="#FF0000"\\] -->
    <!-- <iframe id="237134347" src="https://player.vimeo.com/video/237134347?autoplay=1&amp;title=0&amp;byline=0" allowfullscreen="1" frameborder="0"></iframe>-->
        
        <div style="padding:56.25% 0 0 0;position:relative;">
        <iframe src="https://player.vimeo.com/video/237134347?h=1eb75415d2&autoplay=1&title=0&byline=0&portrait=0"
                style="position:absolute;top:0;left:0;width:100%;height:100%;"
                frameborder="0"
                allow="autoplay; fullscreen"
                allowfullscreen></iframe>
        </div><script src="https://player.vimeo.com/api/player.js"></script>
`

export class VideoWebComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}
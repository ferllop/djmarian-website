export class Video extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.loadShadowCSS()
        this.playBtn = this.addPlayButton(this.shadow)

        this.videoEl = this.querySelector('video')
        this.removeNativeVideoControls()
        
        this.shadow.appendChild(this.videoEl)
    }

    removeNativeVideoControls() {
        this.videoEl.removeAttribute('controls')
    }

    addPlayButton(el) {
        const play = document.createElement('button')
        el.appendChild(play)
        return play
    }

    connectedCallback() {
        this.addEventListener('click', this, {once: true})
        this.videoEl.addEventListener('play', this, {once: true})
    }

    disconnectedCallback() {
        this.removeEventListener('click', this)
        this.videoEl.removeEventListener('play', this)
    }

    handleEvent(event) {
        const eventHandler = this[`handle${event.type}`]
        const hasEventHandler = eventHandler !== undefined
        if (hasEventHandler) {
            eventHandler.call(this, event)
        }
    }

    handleclick() {
        this.videoEl.play()
    }

    handleplay() {
        this.removePlayButton(this.shadow)
        this.videoEl.setAttribute('controls', true)
    }

    removePlayButton(el) {
        if (el.contains(this.playBtn)) {
            el.removeChild(this.playBtn)
        }
    }

    loadShadowCSS() {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(
            `:host {
                position: relative;
                display: block;
                width: 100%;
                cursor: pointer;
            }
            button {
                border: 0;
                display: block;
                position: absolute;
                z-index: 9;
                top: 50%;
                left: 50%;
                --size: clamp(70px, 8vw, 130px);
                margin-top: calc(-1 * (var(--size)/2));
                margin-left: calc(-1 * (var(--size)/2));
                width: var(--size);
                height: var(--size);
                border-radius: 100%;
                opacity: 0.5;
                transition: 
                    opacity 0.3s ease,
                    transform 0.3s ease;
                background-color: #FF0000;
                opacity: 0.7;
            }

            button::after {
                display: block;
                content: "";
                position: absolute;
                z-index: 10;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                --arrow-height: calc(var(--size) / 4);
                --arrow-width: calc(var(--size) / 4 + 1vw);
                margin-top: calc(-1 * (var(--arrow-height)));
                margin-left: calc((var(--arrow-width) / 1.6) - var(--arrow-width));
                border-top: var(--arrow-height) solid transparent;
                border-bottom: var(--arrow-height) solid transparent;
                border-left: var(--arrow-width) solid transparent;
                border-left-color: #FFFFFF;
            }

            :host(:hover) button, :host(:focus) button {
              opacity: 0.9;
              transform: scale(1.1);
            }

            :host(:hover) button {
              opacity: 0.9;
            }`
        )
        this.shadow.adoptedStyleSheets = [sheet]
    }
}

export class Video extends HTMLElement {
    constructor() {
        super()
        this.videoEl = this.removeNativeVideoControls()
        this.playBtn = this.addPlayButton(this)
    }

    removeNativeVideoControls() {
        const video = this.querySelector('video')
        video.removeAttribute('controls')
        return video
    }

    addPlayButton(el) {
        const play = document.createElement('button')
        el.appendChild(play)
        return play
    }

    connectedCallback() {
        this.addEventListener('click', this)
        this.videoEl.addEventListener('play', this)
    }

    disconnectedCallback() {
        this.removeEventListener('click', this)
        this.videoEl.removeEventListener('play', this)
    }

    handleEvent(event) {
        this[`handle${event.type}`](event)
    }

    handleclick() {
        this.videoEl.play()
    }

    handleplay() {
        this.hidePlayButton()
        this.videoEl.setAttribute('controls', true)
    }

    hidePlayButton() {
        this.contains(this.playBtn)
            ? this.removeChild(this.playBtn)
            : this.hasPlayButton = false
    }
}

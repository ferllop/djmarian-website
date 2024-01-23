export class Video extends HTMLElement {
    constructor() {
        super()
        const videoEl = this.querySelector('video')
        const playBtn = document.createElement('button')
        playBtn.addEventListener('click', () => videoEl.play())
        videoEl.addEventListener('click', () => videoEl.play())
        videoEl.addEventListener('play', () => {
            if (this.hasPlayButton) {
                this.removeChild(playBtn)
                this.hasPlayButton = false
            }
            videoEl.setAttribute('controls', true)
        })
        this.videoEl = videoEl
        this.playBtn = playBtn
        this.hasPlayButton = true
    }

    connectedCallback() {
        this.appendChild(this.playBtn)
        this.videoEl.removeAttribute('controls')
    }
}

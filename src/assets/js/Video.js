export class Video extends HTMLElement {
    connectedCallback() {
        const play = this.querySelector('span')
        play.classList.add('play-btn')

        const video = this.querySelector('video')
        play.addEventListener('click', () => {
            video.play()
        })
        video.addEventListener('play', () => {
            play.classList.remove('play-btn')
            video.setAttribute('controls', '')
        })
        video.removeAttribute('controls')
        video.addEventListener('click', () => video.play())
    }
}

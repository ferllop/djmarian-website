export class Video extends HTMLElement {
    connectedCallback() {
        const playBtn = document.createElement('span')
        playBtn.innerHTML = '<span><span class="arrow"></span></span>'
        playBtn.classList.add('play-btn')
        playBtn.addEventListener('click', () => {
            video.play()
        })
        this.appendChild(playBtn)
        
        const video = this.querySelector('video')
        video.removeAttribute('controls')
        video.addEventListener('click', () => video.play())
        video.addEventListener('play', () => {
            playBtn.classList.remove('play-btn')
            video.setAttribute('controls', '')
        })
    }
}

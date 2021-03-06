export class MainFooter extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `<footer class="site-footer">
    <section class="social">
        Encuéntrame en:
        <ul class="logo">
            <li><a target="_blank" rel="noopener" href="https://twitter.com/DjMarianBCN">Twitter</a></li>
            <li><a target="_blank" rel="noopener" href="https://www.facebook.com/DjMarianBCN/">Facebook</a></li>
            <li><a target="_blank" rel="noopener" href="https://www.instagram.com/DjMarianBCN/">Instagram</a></li>
            <li><a target="_blank" rel="noopener" href="https://www.linkedin.com/in/DjMarianBCN">Linkedin</a></li>
            <li><a target="_blank" rel="noopener" href="https://open.spotify.com/user/djmarian">Spotify</a></li>
        </ul>
    </section>
    <section class="nap">
        <p>Carrer Doctor Ferran, 28, 08860, Castelldefels, Barcelona</p>
        <p>Telf. 690 62 64 38</p>
    </section>
    <section class="info">
        <a href="/politica-de-privacidad/">Política de Privacidad</a>
    </section>
    <section class="copyright">
        Copyright © 2022 · DJ MARIAN
    </section>
</footer>`
	}
} 
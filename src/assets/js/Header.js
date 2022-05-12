export class MainHeader extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `<header>
    <section>
        <a href="/" rel="home">
            <img src="/assets/images/logo-dj-marian.svg"
                 alt="Logo de Dj Marian"
                 width="1024" height="154">
        </a>
    </section>
    <nav>
        <ul>
            <li><a href="/marian-corbalan">¿Quien Soy?</a></li>
            <li><a href="/bodas">Bodas</a></li>
            <li><a href="/eventos-corporativos">Eventos Corporativos</a></li>
            <li><a href="/fiestas-privadas">Fiestas Privadas</a></li>
            <li><a href="/opiniones">Opiniones</a></li>
            <li><a href="/contacto">Contacto</a></li>
        </ul>
    </nav>
</header>`
	}
} 

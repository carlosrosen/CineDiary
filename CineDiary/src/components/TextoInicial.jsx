import '../styles/TextoInicial.css';
import '../styles/globalStyle.css'
import imagemCinema from '../assets/Cinema.png';

function TextoInicial() {
    return (
        <main className="hero-container">
            <section className="hero-content">
                <h1 className="hero-title">
                    Transforme suas sessões de <span className="text-red">cinema</span> em memórias registradas
                </h1>
                <p className="hero-subtitle">
                    Organize tudo o que você já assistiu em um só lugar. Registre suas notas, comentários e relembre suas experiências a qualquer momento.
                </p>
                <button className="btn-primary">Organize já</button>
            </section>
            <aside className="hero-image-w">
                <img src={imagemCinema} alt="Sessão de cinema" className="hero-image" />
            </aside>
        </main>
    );
}

export default TextoInicial;
import Logo from '../components/Logo';
import InfoCard from '../components/InfoCard';
import FilterBar from '../components/FilterBar';
import CardAvaliacao from '../components/CardAvaliacao';
import '../styles/PaginaAvaliacoes.css';

function PaginaAvaliacoes() {
    return (
        <main className="pagina-avaliacoes">
            <header className="header-top">
                <div className="logo-area">
                    <Logo />
                </div>
                <section className="info-cards-container" aria-label="Estatísticas">
                    <InfoCard title="Total de registros" value="2" />
                    <InfoCard title="Total de filmes" value="1" />
                    <InfoCard title="Total de séries" value="1" />
                </section>
            </header>

            <div className="content-container">
                <section className="header-middle" aria-label="Controles de avaliação">
                    <header className="title-section">
                        <h1>Avaliações</h1>
                        <button className="btn-adicionar">+ Adicionar</button>
                    </header>
                    <div className="filter-section">
                        <FilterBar />
                    </div>
                </section>

            <section className="cards-grid" aria-label="Lista de avaliações">
                <CardAvaliacao 
                    title="Breaking Bad" 
                    rating="10 / 10" 
                    type="Série" 
                    comment="Uma das melhores séries já feitas. A evolução do Walter White é incrivel." 
                />
                <CardAvaliacao 
                    title="Harry Potter e a Pedra Filosofal" 
                    rating="9 / 10" 
                    type="Filme" 
                    comment="Um começo inesquecível para a saga. A magia de Hogwarts, os personagens cativantes e a aventura envolvente tornam o filme especial até hoje." 
                />
            </section>
            </div>
        </main>
    )
}

export default PaginaAvaliacoes;
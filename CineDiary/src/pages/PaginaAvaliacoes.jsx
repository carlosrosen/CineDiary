import { useState } from 'react';
import Logo from '../components/Logo';
import InfoCard from '../components/InfoCard';
import FilterBar from '../components/FilterBar';
import CardAvaliacao from '../components/CardAvaliacao';
import '../styles/PaginaAvaliacoes.css';

function PaginaAvaliacoes() {
    const [filtro, setFiltro] = useState('Todos');

    // Depois trocar pelos dados recebidos pelo backend Davi
    const avaliacoesteste = [
        {
            id: 1,
            title: "Breaking Bad",
            rating: "9.5",
            type: "Série",
            start_date: "2020-10-10",
            end_date: "2021-01-15",
            comment: "Uma das melhores séries já feitas. A evolução do Walter White é incrivel."
         },
        {
            id: 2,
            title: "Harry Potter e a Pedra Filosofal",
            rating: "9.0",
            type: "Filme",
            start_date: "2001-11-23",
            end_date: "2001-11-23",
            comment: "Um começo inesquecível para a saga."
         }
    ];  

    const avaliacoesFiltradas = avaliacoesteste.filter(avaliacao => {
        if (filtro === 'Todos') return true;
        return avaliacao.type === filtro;
    });

    return (
        <main className="pagina-avaliacoes">
            <header className="header-top">
                <div className="logo-area">
                    <Logo />
                </div>
                <section className="info-cards-container" aria-label="Estatísticas">
                    <InfoCard title="Total de registros" value={avaliacoesteste.length.toString()} />
                    <InfoCard title="Total de filmes" value={avaliacoesteste.filter(a => a.type === "Filme").length.toString()} />
                    <InfoCard title="Total de séries" value={avaliacoesteste.filter(a => a.type === "Série").length.toString()} />
                </section>
            </header>

            <div className="content-container">
                <section className="header-middle" aria-label="Controles de avaliação">
                    <header className="title-section">
                        <h1>Avaliações</h1>
                        <button className="btn-adicionar">+ Adicionar</button>
                    </header>
                    <div className="filter-section">
                        <FilterBar filtro={filtro} setFiltro={setFiltro} />
                    </div>
                </section>

            <section className="cards-grid" aria-label="Lista de avaliações">
                {avaliacoesFiltradas.map((avaliacao) => (
                    <CardAvaliacao 
                        key={avaliacao.id}
                        title={avaliacao.title} 
                        rating={avaliacao.rating} 
                        type={avaliacao.type}
                        start_date={avaliacao.start_date} 
                        end_date={avaliacao.end_date} 
                        comment={avaliacao.comment} 
                    />
                ))}
            </section>
            </div>
        </main>
    )
}

export default PaginaAvaliacoes;
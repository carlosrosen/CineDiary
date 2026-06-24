import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from '../components/Logo/Logo';
import InfoCard from '../components/InfoCard/InfoCard';
import FilterBar from '../components/FilterBar/FilterBar';
import CardAvaliacao from '../components/CardAvaliacao/CardAvaliacao';
import "../styles/PaginaAvaliacoes.css";
import { AvaliacoesContext } from "../context/AvaliacoesContext";
import { ModalEditAvaliacao } from '../components/ModalEditAvaliacao/ModalEditAvaliacao';
import { ModalDelAvaliacao } from '../components/ModalDelAvaliacao/ModalDelAvaliacao';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';

function PaginaAvaliacoes() {
  const [filtro, setFiltro] = useState("Todos");

  const [showEditarAvaliacao, setShowEditarAvaliacao] = useState(false);
  const [showDeletarAvaliacao, setShowDeletarAvaliacao] = useState(false);
  const [editData, setEditData] = useState({});
  const [deleteData, setDeleteData] = useState({});

  const { cards, isRefreshing, setAlertTitle, setMessageAlert } = useContext(AvaliacoesContext);

  const avaliacoesFiltradas = cards.filter((avaliacao) => {
    if (filtro === "Todos") return true;
    return avaliacao.type === filtro;
  });

  return (
    <main className="pagina-avaliacoes">
      <header className="header-top">
        <div className="logo-area">
          <Logo />
        </div>
        <section className="info-cards-container" aria-label="Estatísticas">
          <InfoCard
            title="Total de registros"
            value={cards.length.toString()}
          />
          <InfoCard
            title="Total de filmes"
            value={cards.filter((a) => a.type === "Filme").length.toString()}
          />
          <InfoCard
            title="Total de séries"
            value={cards.filter((a) => a.type === "Série").length.toString()}
          />
        </section>
      </header>

      <div className="content-container">
        <section className="header-middle" aria-label="Controles de avaliação">
          <header className="title-section">
            <h1>Avaliações</h1>
            <Link to="/adicionar">
              <button className="btn-adicionar">+ Adicionar</button>
            </Link>
          </header>
          <div className="filter-section">
            <FilterBar filtro={filtro} setFiltro={setFiltro} />
          </div>
        </section>

        {!isRefreshing ? (
          cards.length !== 0 ? (
            <section
              className="cards-grid"
              aria-label="Lista de avaliações"
              onClick={(e) => {
                if (e.target.classList.contains("btn-deletar")) {
                  const cardEl = e.target.closest(".review-card");
                  if (cardEl) {
                    const cardsArray = Array.from(e.currentTarget.querySelectorAll(".review-card"));
                    const index = cardsArray.indexOf(cardEl);
                    if (index !== -1) {
                      setDeleteData(avaliacoesFiltradas[index]);
                      setShowDeletarAvaliacao(true);
                    }
                  }
                }
              }}
            >
              {avaliacoesFiltradas.map((avaliacao) => (
                <CardAvaliacao
                  key={avaliacao.id}
                  id={avaliacao.id}
                  title={avaliacao.title}
                  rating={avaliacao.rating}
                  type={avaliacao.type}
                  start_date={avaliacao.start_date}
                  end_date={avaliacao.end_date}
                  comment={avaliacao.comment}
                  setEditData={setEditData}
                  setShowEditarAvaliacao={setShowEditarAvaliacao}
                />
              ))}
            </section>
          ) : (
            <p>Nenhum filme ou série foi avaliado</p>
          )
        ) : (
          <LoadingSpinner text="Carregando cards..." />
        )}
      </div>
      <ModalEditAvaliacao
        showEditarAvaliacao={showEditarAvaliacao}
        setShowEditarAvaliacao={setShowEditarAvaliacao}
        setMessageAlert={setMessageAlert}
        setAlertTitle={setAlertTitle}
        movieSerie={editData}
      />
      <ModalDelAvaliacao
        showDeletarAvaliacao={showDeletarAvaliacao}
        setShowDeletarAvaliacao={setShowDeletarAvaliacao}
        setAlertTitle={setAlertTitle}
        setMessageAlert={setMessageAlert}
        movieSerie={deleteData}
      />
    </main>
  );
}

export default PaginaAvaliacoes;

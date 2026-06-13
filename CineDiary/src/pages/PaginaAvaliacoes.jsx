import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AlertModal } from "../components/AlertModal";
import Logo from "../components/Logo";
import InfoCard from "../components/InfoCard";
import FilterBar from "../components/FilterBar";
import CardAvaliacao from "../components/CardAvaliacao";
import "../styles/PaginaAvaliacoes.css";
import { getAvaliacoes } from "../services/api";
import { ModalEditAvaliacao } from "../components/ModalEditAvaliacao";
import { ModalDelAvaliacao } from "../components/ModalDelAvaliacao";
import { LoadingSpinner } from "../components/LoadingSpinner";

function PaginaAvaliacoes() {
  const [filtro, setFiltro] = useState("Todos");

  const [showEditarAvaliacao, setShowEditarAvaliacao] = useState(false);
  const [showDeletarAvaliacao, setShowDeletarAvaliacao] = useState(false);
  const [editData, setEditData] = useState({});
  const [deleteData, setDeleteData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [alertTitle, setAlertTitle] = useState("Ocorreu um erro");

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [cards, setCards] = useState([]);

  // cria um timer para o modal de alerta
  useEffect(() => {
    if (messageAlert === "") {
      setAlertTitle("Ocorreu um erro");
      return;
    }
    const alertTimeout = () => {
      setShowAlert(true);
      setTimeout(() => {
        setMessageAlert("");
        setShowAlert(false);
      }, 8000);
    };
    alertTimeout();
  }, [messageAlert]);

  const refresh = async () => {
    try {
      setIsRefreshing(true);
      const data = await getAvaliacoes();
      setCards(data);
      setIsRefreshing(false);
    } catch (err) {
      console.error(err);
      setMessageAlert("Não foi possivel conectar com o servidor");
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    (async () => {
      await refresh();
    })();
  }, []);

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
        refresh={refresh}
        setIsRefreshing={setIsRefreshing}
        showEditarAvaliacao={showEditarAvaliacao}
        setShowEditarAvaliacao={setShowEditarAvaliacao}
        setMessageAlert={setMessageAlert}
        movieSerie={editData}
      />
      <ModalDelAvaliacao
        refresh={refresh}
        showDeletarAvaliacao={showDeletarAvaliacao}
        setShowDeletarAvaliacao={setShowDeletarAvaliacao}
        setAlertTitle={setAlertTitle}
        setMessageAlert={setMessageAlert}
        movieSerie={deleteData}
      />
      <AlertModal
        title={alertTitle}
        messageAlert={messageAlert}
        setMessageAlert={setMessageAlert}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
    </main>
  );
}

export default PaginaAvaliacoes;

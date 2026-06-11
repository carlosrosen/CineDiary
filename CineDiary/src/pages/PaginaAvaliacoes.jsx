import { useState, useEffect } from "react";
import { AddMovieSerie } from "../components/AddMovieSerie";
import { AlertModal } from "../components/AlertModal";
import Logo from "../components/Logo";
import InfoCard from "../components/InfoCard";
import FilterBar from "../components/FilterBar";
import CardAvaliacao from "../components/CardAvaliacao";
import "../styles/PaginaAvaliacoes.css";
import { EditMovieSerie } from "../components/EditMovieSerie";

function PaginaAvaliacoes() {
  const [filtro, setFiltro] = useState("Todos");

  const [showAddMovieSerie, setShowAddMovieSerie] = useState(false);
  const [showEditMovieSerie, setShowEditMovieSerie] = useState(false);
  const [editData, setEditData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [cards, setCards] = useState([]);

  // cria um timer para o modal de alerta
  useEffect(() => {
    if (messageAlert === "") return;
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
      const response = await fetch("http://localhost:3000/api", {
        method: "GET",
      });
      setCards(await response.json());
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
            <button
              className="btn-adicionar"
              onClick={() => {
                setShowAddMovieSerie(true);
              }}
            >
              + Adicionar
            </button>
          </header>
          <div className="filter-section">
            <FilterBar filtro={filtro} setFiltro={setFiltro} />
          </div>
        </section>

        {!isRefreshing ? (
          cards.length !== 0 ? (
            <section className="cards-grid" aria-label="Lista de avaliações">
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
                  setShowEditMovieSerie={setShowEditMovieSerie}
                />
              ))}
            </section>
          ) : (
            <p>Nenhum filme ou série foi avaliado</p>
          )
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
              color: "white",
              minHeight: "200px",
            }}
          >
            <div
              style={{
                border: "4px solid rgba(255, 255, 255, 0.1)",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                borderLeftColor: "#ff0000",
                animation: "spin 1s linear infinite",
                marginBottom: "1rem",
              }}
            />
            <span>Carregando cards...</span>
            <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          </div>
        )}
      </div>
      <EditMovieSerie
        refresh={refresh}
        setIsRefreshing={setIsRefreshing}
        showEditMovieSerie={showEditMovieSerie}
        setShowEditMovieSerie={setShowEditMovieSerie}
        setMessageAlert={setMessageAlert}
        movieSerie={editData}
      />
      <AddMovieSerie
        refresh={refresh}
        setIsRefreshing={setIsRefreshing}
        showAddMovieSerie={showAddMovieSerie}
        setShowAddMovieSerie={setShowAddMovieSerie}
        setMessageAlert={setMessageAlert}
      />
      <AlertModal
        title="Ocorreu um erro"
        messageAlert={messageAlert}
        setMessageAlert={setMessageAlert}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
    </main>
  );
}

export default PaginaAvaliacoes;

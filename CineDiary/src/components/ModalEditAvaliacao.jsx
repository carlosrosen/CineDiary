import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { updateAvaliacao } from "../services/api";
import { AvaliacoesContext } from "../context/AvaliacoesContext";
import "../styles/globalStyle.css";
import "../styles/ModalEditAvaliacao.css";

const RATING_DEFAULT = 5.0;

export const ModalEditAvaliacao = (props) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [rating, setRating] = useState(RATING_DEFAULT);
  const [comment, setComment] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { fetchAvaliacoes } = useContext(AvaliacoesContext);

  useEffect(() => {
    (() => {
      if (props.movieSerie) {
        setTitle(props.movieSerie.title || "");
        setType(props.movieSerie.type || "");
        setStartDate(props.movieSerie.start_date || "");
        setEndDate(props.movieSerie.end_date || "");
        setRating(props.movieSerie.rating || RATING_DEFAULT);
        setComment(props.movieSerie.comment || "");
      }
    })();
  }, [props.movieSerie, props.showEditarAvaliacao]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!props.movieSerie || !props.movieSerie.id) {
      props.setMessageAlert("ID do filme/série inválido.");
      return;
    }
    if (!title) {
      props.setMessageAlert("O título é obrigatório.");
      return;
    }
    if (!type) {
      props.setMessageAlert("O tipo é obrigatório.");
      return;
    }
    if (!rating) {
      props.setMessageAlert("A avaliação é obrigatória.");
      return;
    }
    const numericRating = parseFloat(rating);
    if (numericRating < 0 || numericRating > 10) {
      props.setMessageAlert("A avaliação deve estar entre 0 e 10.");
      return;
    }
    if (start_date && end_date && new Date(start_date) > new Date(end_date)) {
      props.setMessageAlert(
        "A data de início não pode ser posterior à data de término.",
      );
      return;
    }

    const updatedFilm = {
      title,
      type,
      start_date,
      end_date,
      rating: numericRating,
      comment,
    };

    try {
      setIsUpdating(true);
      await updateAvaliacao(props.movieSerie.id, updatedFilm);
      await fetchAvaliacoes();
      setIsUpdating(false);
      props.setShowEditarAvaliacao(false);
    } catch {
      console.error('Erro ao editar avaliação')
      props.setMessageAlert('Erro ao editar avaliação');
      setIsUpdating(false);
    }
  };

  return (
    <Modal
      id="edit-form"
      className="edit-movie-modal"
      overlayClassName="edit-movie-overlay"
      isOpen={props.showEditarAvaliacao}
      onRequestClose={() => props.setShowEditarAvaliacao(false)}
      contentLabel="Editar Filme/Série"
      appElement={document.getElementById("root")}
    >
      <header>
        <h2>Editar avaliação</h2>
      </header>
      <form
        onSubmit={handleSubmit}
        className={`edit-movie-form ${isUpdating ? "hidden" : ""}`}
      >
        <label htmlFor="edit-title">
          Título <span className="required-asterisk">*</span>
        </label>
        <input
          id="edit-title"
          type="text"
          placeholder="Insira o seu título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required={true}
        />
        <label htmlFor="edit-type">
          Tipo <span className="required-asterisk">*</span>
        </label>
        <select
          id="edit-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required={true}
        >
          <option value="">Selecione o tipo</option>
          <option value="Filme">Filme</option>
          <option value="Série">Série</option>
        </select>
        <section className="form-row">
          <label htmlFor="edit-start_date" className="date-label">
            Data de Início
            <input
              id="edit-start_date"
              type="date"
              placeholder="Start Date"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label htmlFor="edit-end_date" className="date-label">
            Data de Término
            <input
              id="edit-end_date"
              type="date"
              placeholder="End Date"
              value={end_date}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </section>
        <label htmlFor="edit-rating">Avaliação</label>
        <section className="rating-section">
          <input
            id="edit-rating"
            type="range"
            min="0"
            max="10"
            step={0.1}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <span className="rating-value">
            {Number.parseFloat(rating).toFixed(1)}
          </span>
        </section>
        <label htmlFor="edit-comment">Comentário</label>
        <textarea
          id="edit-comment"
          placeholder="Insira aqui o seu comentário"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <footer className="button-group">
          <button
            type="button"
            onClick={() => {
              props.setShowEditarAvaliacao(false);
            }}
            className="btn-cancel"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-save"
          >
            Salvar
          </button>
        </footer>
      </form>
      {isUpdating && (
        <section className="loading-container" aria-live="polite">
          <span className="spinner" aria-hidden="true" />
          <span>Atualizando...</span>
        </section>
      )}
    </Modal>
  );
};

import { useState } from "react";
import Modal from "react-modal";
import "../styles/globalStyle.css";
import "../styles/AddMovieSerie.css";

const RATING_DEFAULT = 5.0;

export const AddMovieSerie = (props) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [rating, setRating] = useState(RATING_DEFAULT);
  const [comment, setComment] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const resetForm = () => {
    setTitle("");
    setType("");
    setStartDate("");
    setEndDate("");
    setRating(RATING_DEFAULT);
    setComment("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      props.setMessageAlert("A data de início não pode ser posterior à data de término.");
      return;
    }
    
    const newFilm = {
      title,
      type,
      start_date,
      end_date,
      rating: numericRating,
      comment,
    };

    try {
      setIsAdding(true);
      const response = await fetch("http://localhost:3000/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFilm),
      });
      if (!response.ok) {
        throw new Error("Erro ao adicionar o filme/série");
      }
      resetForm();
      setIsAdding(false);
      props.refresh();
      props.setShowAddMovieSerie(false);
    } catch (error) {
      console.error("Error adding movie or serie:", error);
      props.setMessageAlert(error.message);
      setIsAdding(false);
    }
  };

  return (
    <Modal
      id="add-form"
      className="add-movie-modal"
      overlayClassName="add-movie-overlay"
      isOpen={props.showAddMovieSerie}
      onRequestClose={() => props.setShowAddMovieSerie(false)}
      contentLabel="Adicionar Filme/Série"
      appElement={document.getElementById("root")}
    >
      <header>
        <h2>Adicionar Filme/Série</h2>
      </header>
      <form
        onSubmit={handleSubmit}
        className={`add-movie-form ${isAdding ? "hidden" : ""}`}
      >
        <label htmlFor="title">
          Título <span className="required-asterisk">*</span>
        </label>
        <input
          id="title"
          type="text"
          placeholder="Insira o seu título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required={true}
        />
        <label htmlFor="type">
          Tipo <span className="required-asterisk">*</span>
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required={true}
        >
          <option value="">Selecione o tipo</option>
          <option value="Filme">Filme</option>
          <option value="Série">Série</option>
        </select>
        <section className="form-row">
          <label htmlFor="start_date" className="date-label">
            Data de Início
            <input
              id="start_date"
              type="date"
              placeholder="Start Date"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label htmlFor="end_date" className="date-label">
            Data de Término
            <input
              id="end_date"
              type="date"
              placeholder="End Date"
              value={end_date}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </section>
        <label htmlFor="rating">Avaliação</label>
        <section className="rating-section">
          <input
            id="rating"
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
        <label htmlFor="comment">Comentário</label>
        <textarea
          id="comment"
          placeholder="Insira aqui o seu comentário"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <footer className="button-group">
          <button
            type="button"
            onClick={() => props.setShowAddMovieSerie(false)}
            className="btn-cancel"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-submit"
          >
            Adicionar
          </button>
        </footer>
      </form>
      {isAdding && (
        <section className="loading-container" aria-live="polite">
          <span className="spinner" aria-hidden="true" />
          <span>Adicionando...</span>
        </section>
      )}
    </Modal>
  );
};

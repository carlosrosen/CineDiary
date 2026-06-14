import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createAvaliacao } from "../services/api";
import { AvaliacoesContext } from "../context/AvaliacoesContext";
import "../styles/globalStyle.css";
import "../styles/FormAddAvaliacao.css";

const RATING_DEFAULT = 5.0;

export const FormAddAvaliacao = (props) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [rating, setRating] = useState(RATING_DEFAULT);
  const [comment, setComment] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  
  const { fetchAvaliacoes } = useContext(AvaliacoesContext);
  const navigate = useNavigate();

  const resetForm = () => {
    setTitle("");
    setType("");
    setStartDate("");
    setEndDate("");
    setRating(RATING_DEFAULT);
    setComment("");
  };

  const handleCancel = () => {
    navigate('/avaliacoes');
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
      await createAvaliacao(newFilm);
      resetForm();
      await fetchAvaliacoes();
      setIsAdding(false);
      navigate('/avaliacoes');
    } catch (error) {
      console.error("Error adding movie or serie:", error);
      props.setMessageAlert(error.message);
      setIsAdding(false);
    }
  };

  return (
    <section id="add-form" className="add-movie-container">
      <header>
        <h2>Adicionar avaliação</h2>
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
              placeholder="Data de Início"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label htmlFor="end_date" className="date-label">
            Data de Término
            <input
              id="end_date"
              type="date"
              placeholder="Data de Término"
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
            onClick={handleCancel}
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
    </section>
  );
};

import { useState, useEffect } from "react";
import Modal from "react-modal";
import "../styles/addEditMovieSerie.css";

const RATING_DEFAULT = 5.0;

export const EditMovieSerie = (props) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [rating, setRating] = useState(RATING_DEFAULT);
  const [comment, setComment] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

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
  }, [props.movieSerie, props.showEditMovieSerie]);

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
      const response = await fetch(
        `http://localhost:3000/api/${props.movieSerie.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFilm),
        },
      );
      if (!response.ok) {
        throw new Error("Erro ao editar o filme/série");
      }
      setIsUpdating(false);
      props.refresh();
      props.setShowEditMovieSerie(false);
    } catch {
      console.error('Erro ao editar avaliação')
      props.setMessageAlert('Erro ao editar avaliação');
    }
  };

  return (
    <Modal
      id="edit-form"
      className="form-field"
      isOpen={props.showEditMovieSerie}
      onRequestClose={() => props.setShowEditMovieSerie(false)}
      contentLabel="Editar Filme/Série"
      appElement={document.getElementById("root")}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        },
        content: {
          display: "flex",
          flex: 1,
          justifySelf: "center",
          alignSelf: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "2rem",
          borderRadius: "8px",
          gap: "1rem",
        },
      }}
    >
      <h2>Editar Filme/Série</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: isUpdating ? "none" : "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <label htmlFor="edit-title">
          Título <span style={{ color: "red" }}>*</span>
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
          Tipo <span style={{ color: "red" }}>*</span>
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
        <section style={{ display: "flex", gap: "1rem", flexDirection: "row" }}>
          <label
            htmlFor="edit-start_date"
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            Data de Início
            <input
              id="edit-start_date"
              type="date"
              placeholder="Start Date"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label
            htmlFor="edit-end_date"
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
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
        <section
          style={{
            display: "flex",
            gap: "1rem",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <input
            id="edit-rating"
            type="range"
            min="0"
            max="10"
            step={0.1}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <span
            style={{ marginLeft: "2rem", color: "red", fontSize: "1.2rem" }}
          >
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
        <section
          style={{
            display: "flex",
            gap: "1rem",
            flexDirection: "row",
            marginTop: "1rem",
          }}
        >
          <button
            type="button"
            onClick={()=>{props.setShowEditMovieSerie(false)}}
            style={{
              backgroundColor: "#242424",
              flex: 1,
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            style={{
              backgroundColor: "#ff0000",
              color: "white",
              flex: 1,
              border: "none",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            Salvar
          </button>
        </section>
      </form>
      {isUpdating && (
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
          <span>Atualizando...</span>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
    </Modal>
  );
};

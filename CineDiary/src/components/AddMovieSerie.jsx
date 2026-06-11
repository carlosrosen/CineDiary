import { useState } from "react";
import Modal from "react-modal";
import "../styles/addEditMovieSerie.css";

const RATE_DEFAULT = 5.0;

export const AddMovieSerie = (props) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [rate, setRate] = useState(RATE_DEFAULT);
  const [comment, setComment] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const resetForm = () => {
    setTitle("");
    setType("");
    setStartDate("");
    setEndDate("");
    setRate(RATE_DEFAULT);
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
    if (!rate) {
      props.setMessageAlert("A avaliação é obrigatória.");
      return;
    }
    const numericRate = parseFloat(rate);
    if (numericRate < 0 || numericRate > 10) {
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
      rate: numericRate,
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
      className="form-field"
      isOpen={props.showAddMovieSerie}
      onRequestClose={() => props.setShowAddMovieSerie(false)}
      contentLabel="Adicionar Filme/Série"
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
      <h2>Adicionar Filme/Série</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: isAdding ? "none" : "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <label htmlFor="title">
          Título <span style={{ color: "red" }}>*</span>
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
          Tipo <span style={{ color: "red" }}>*</span>
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required={true}
        >
          <option value="">Selecione o tipo</option>
          <option value="movie">Filme</option>
          <option value="series">Série</option>
        </select>
        <section style={{ display: "flex", gap: "1rem", flexDirection: "row" }}>
          <label
            htmlFor="start_date"
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            Data de Início
            <input
              id="start_date"
              type="date"
              placeholder="Start Date"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label
            htmlFor="end_date"
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
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
        <label htmlFor="rate">Avaliação</label>
        <section
          style={{
            display: "flex",
            gap: "1rem",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <input
            id="rate"
            type="range"
            min="0"
            max="10"
            step={0.1}
            placeholder="Rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
          <span style={{ marginLeft: "2rem", color: "red", fontSize: "1.2rem" }}>
            {Number.parseFloat(rate).toFixed(1)}
          </span>
        </section>
        <label htmlFor="comment">Comentário</label>
        <textarea
          id="comment"
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
            onClick={() => props.setShowAddMovieSerie(false)}
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
            Adicionar
          </button>
        </section>
      </form>
      {isAdding && (
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
          <span>Adicionando...</span>
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

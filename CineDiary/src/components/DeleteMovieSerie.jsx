import { useState } from "react";
import Modal from "react-modal";
import "../styles/addEditMovieSerie.css";

export const DeleteMovieSerie = (props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!props.movieSerie || !props.movieSerie.id) {
      props.setMessageAlert("ID da avaliação inválido.");
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(
        `http://localhost:3000/api/${props.movieSerie.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir o filme/série");
      }

      setIsDeleting(false);
      props.refresh();
      props.setShowDeleteMovieSerie(false);
      
      // Emit success alert
      if (props.setAlertTitle) {
        props.setAlertTitle("Sucesso");
      }
      props.setMessageAlert(`"${props.movieSerie.title}" deletado com sucesso.`);
    } catch (error) {
      console.error("Error deleting movie or serie:", error);
      if (props.setAlertTitle) {
        props.setAlertTitle("Ocorreu um erro");
      }
      props.setMessageAlert(error.message || "Erro ao excluir o filme/série");
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      id="delete-confirm"
      isOpen={props.showDeleteMovieSerie}
      onRequestClose={() => props.setShowDeleteMovieSerie(false)}
      contentLabel="Excluir Avaliação"
      appElement={document.getElementById("root")}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        content: {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2.5rem 2rem",
          borderRadius: "4px",
          backgroundColor: "#161616",
          border: "none",
          width: "90%",
          maxWidth: "480px",
          height: "auto",
          inset: "auto",
          gap: "1.5rem",
          margin: "auto",
        },
      }}
    >
      {isDeleting ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            color: "white",
            minHeight: "100px",
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
          <span style={{ fontSize: "1rem", color: "#fff" }}>Excluindo...</span>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: "1.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "normal",
              color: "#fff",
              textAlign: "center",
              margin: 0,
            }}
          >
            Deseja excluir sua avaliação?
          </h2>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={() => props.setShowDeleteMovieSerie(false)}
              style={{
                backgroundColor: "#222222",
                color: "white",
                border: "none",
                padding: "0.75rem 2rem",
                cursor: "pointer",
                fontSize: "1rem",
                borderRadius: "4px",
                flex: 1,
                maxWidth: "150px",
                textAlign: "center",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#222222")}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleDelete}
              style={{
                backgroundColor: "#DD0000",
                color: "white",
                border: "none",
                padding: "0.75rem 2rem",
                cursor: "pointer",
                fontSize: "1rem",
                borderRadius: "4px",
                flex: 1,
                maxWidth: "150px",
                textAlign: "center",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FF1A1A")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#DD0000")}
            >
              Deletar
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

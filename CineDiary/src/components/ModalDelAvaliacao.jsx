import { useState } from "react";
import Modal from "react-modal";
import { deleteAvaliacao } from "../services/api";
import "../styles/globalStyle.css";
import "../styles/ModalDelAvaliacao.css";

export const ModalDelAvaliacao = (props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!props.movieSerie || !props.movieSerie.id) {
      props.setMessageAlert("ID da avaliação inválido.");
      return;
    }

    try {
      setIsDeleting(true);
      await deleteAvaliacao(props.movieSerie.id);
      setIsDeleting(false);
      props.refresh();
      props.setShowDeletarAvaliacao(false);
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
      isOpen={props.showDeletarAvaliacao}
      onRequestClose={() => props.setShowDeletarAvaliacao(false)}
      contentLabel="Excluir Avaliação"
      appElement={document.getElementById("root")}
      className="delete-movie-modal"
      overlayClassName="delete-movie-overlay"
    >
      {isDeleting ? (
        <section className="delete-loading-container" aria-live="polite">
          <span className="spinner" aria-hidden="true" />
          <span className="delete-loading-text">Excluindo...</span>
        </section>
      ) : (
        <section className="delete-content-wrapper">
          <header>
            <h2 className="delete-title">
              Deseja excluir sua avaliação?
            </h2>
          </header>
          <footer className="delete-buttons-wrapper">
            <button
              type="button"
              onClick={() => props.setShowDeletarAvaliacao(false)}
              className="btn-delete-cancel"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="btn-delete-confirm"
            >
              Deletar
            </button>
          </footer>
        </section>
      )}
    </Modal>
  );
};

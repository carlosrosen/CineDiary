import Modal from "react-modal";
import "./AlertModal.css";

export const AlertModal = (props) => {
  return (
    <Modal
      className="error-modal"
      overlayClassName="alert-modal-overlay"
      isOpen={props.showAlert}
      onRequestClose={() => {
        props.setAlertMessage("");
        props.setShowAlert(false);
      }}
      contentLabel="Erro"
      appElement={document.getElementById("root")}
    >
      <h2>{props.title}</h2>
      <p>{props.alertMessage}</p>
      <button
        className="alert-modal-btn"
        onClick={() => {
          props.setAlertMessage("");
          props.setShowAlert(false);
        }}
      >
        Fechar
      </button>
    </Modal>
  );
};

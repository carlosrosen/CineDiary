import Modal from "react-modal";

export const AlertModal = (props) => {
  return (
    <Modal
      className="error-modal"
      isOpen={props.showAlert}
      onRequestClose={() => {
        props.setMessageAlert("");
        props.setShowAlert(false);
      }}
      contentLabel="Erro"
      appElement={document.getElementById("root")}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        content: {
          position: "relative",
          color: "#fff",
          backgroundColor: "#161616",
          margin: "auto",
          padding: "2rem",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        },
      }}
    >
      <h2>{props.title}</h2>
      <p>{props.messageAlert}</p>
      <button
        onClick={() => {
          props.setMessageAlert("");
          props.setShowAlert(false);
        }}
        style={{
          backgroundColor: "#ff0000",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          cursor: "pointer",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        Fechar
      </button>
    </Modal>
  );
};

import "../styles/LoadingSpinner.css";

export const LoadingSpinner = ({ text = "Carregando..." }) => {
  return (
    <div className="loading-spinner-container" aria-live="polite">
      <div className="loading-spinner-circle" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
};

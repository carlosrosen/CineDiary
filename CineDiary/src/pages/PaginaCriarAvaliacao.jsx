import { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { FormAddAvaliacao } from '../components/FormAddAvaliacao';
import { AlertModal } from '../components/AlertModal';
import '../styles/PaginaCriarAvaliacao.css';

const PaginaCriarAvaliacao = () => {
  const [messageAlert, setMessageAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("Ocorreu um erro");

  useEffect(() => {
    if (messageAlert === "") {
      setShowAlert(false);
      setAlertTitle("Ocorreu um erro");
      return;
    }
    const alertTimeout = () => {
      setShowAlert(true);
      setTimeout(() => {
        setMessageAlert("");
        setShowAlert(false);
      }, 8000);
    };
    alertTimeout();
  }, [messageAlert]);

  const handleRefresh = () => {
    console.log("Sua avaliação foi registrada com sucesso!");
  };

  return (
    <>
    <header className="cadastro-header">
        <Logo />
    </header>
    <main className="pagina-criar-avaliacao">
      <div className="red-triangle-bg" aria-hidden="true"></div>
      <FormAddAvaliacao 
        setMessageAlert={setMessageAlert}
        refresh={handleRefresh}
      />
      <AlertModal
        title={alertTitle}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        messageAlert={messageAlert}
        setMessageAlert={setMessageAlert}
      />
    </main>
    </>
  );
};

export default PaginaCriarAvaliacao;

import { useState, useEffect } from "react";
import { getAvaliacoes } from "../services/api";
import { AvaliacoesContext } from "./AvaliacoesContext";
import { AlertModal } from "../components/AlertModal";

export const AvaliacoesProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (alertMessage === "") {
      (() => {
        setShowAlert(false);
        setAlertTitle("Ocorreu um erro");
      })();
      return;
    }
    const alertTimeout = () => {
      setShowAlert(true);
      setTimeout(() => {
        setAlertMessage("");
        setShowAlert(false);
      }, 4000);
    };
    alertTimeout();
  }, [alertMessage]);

  const fetchAvaliacoes = async () => {
    try {
      setIsRefreshing(true);
      const data = await getAvaliacoes();
      setCards(data);
      setIsRefreshing(false);
    } catch (err) {
      console.error(err);
      setAlertTitle("Ocorreu um erro");
      setAlertMessage("Não foi possivel se conectar com o servidor, volte mais tarde.");
      setIsRefreshing(false);
      throw err;
    }
  };

  useEffect(() => {
    (() => fetchAvaliacoes())();
  }, []);

  return (
    <AvaliacoesContext.Provider
      value={{
        cards,
        isRefreshing,
        fetchAvaliacoes,
        setAlertTitle,
        setAlertMessage: (message) => {
          setAlertMessage(message);
          setShowAlert(true);
        },
      }}
    >
      {children}
      <AlertModal
        title={alertTitle}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        alertMessage={alertMessage}
        setAlertMessage={setAlertMessage}
      />
    </AvaliacoesContext.Provider>
  );
};

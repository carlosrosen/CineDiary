import { createContext, useState, useEffect } from "react";
import { getAvaliacoes } from "../services/api";

export const AvaliacoesContext = createContext();

export const AvaliacoesProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAvaliacoes = async () => {
    try {
      setIsRefreshing(true);
      const data = await getAvaliacoes();
      setCards(data);
      setIsRefreshing(false);
    } catch (err) {
      console.error(err);
      setIsRefreshing(false);
      throw err; 
    }
  };

  useEffect(() => {
    fetchAvaliacoes();
  }, []);

  return (
    <AvaliacoesContext.Provider
      value={{
        cards,
        isRefreshing,
        fetchAvaliacoes,
      }}
    >
      {children}
    </AvaliacoesContext.Provider>
  );
};

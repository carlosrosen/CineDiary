import { useContext } from 'react';
import Logo from '../components/Logo';
import { FormAddAvaliacao } from '../components/FormAddAvaliacao';
import '../styles/PaginaCriarAvaliacao.css';
import { AvaliacoesContext } from '../context/AvaliacoesContext';

const PaginaCriarAvaliacao = () => {
  const {setMessageAlert, setAlertTitle} = useContext(AvaliacoesContext)


  const handleRefresh = () => {
    setAlertTitle('Operação Concluida')
    setMessageAlert("Sua avaliação foi registrada com sucesso!");
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
    </main>
    </>
  );
};

export default PaginaCriarAvaliacao;

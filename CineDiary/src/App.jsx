import { useState, useEffect } from "react";
import { AddEditMovieSerie } from "./components/addEditMovieSerie";
import { AlertModal } from "./components/AlertModal";

function App() {
  const [showAddEditMovieSerie, setShowAddEditMovieSerie] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  
  useEffect(()=>{
    if(messageAlert === '') return;
    const alertTimeout = async ()=>{
      setShowAlert(true);
      setTimeout(()=>{
        setMessageAlert("");
        setShowAlert(false);
      }, 8000)
    }
    alertTimeout();
    }, [messageAlert])
  return (
    <div>
      <button onClick={() => {setShowAddEditMovieSerie(true)}}>
        Adicionar Filme/Série
      </button>
      <AddEditMovieSerie setShowAddEditMovieSerie={setShowAddEditMovieSerie} showAddEditMovieSerie={showAddEditMovieSerie} setMessageAlert={setMessageAlert} />
      <AlertModal title='Ocorreu um erro' messageAlert={messageAlert} setMessageAlert={setMessageAlert} showAlert={showAlert} setShowAlert={setShowAlert} />
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { AddMovieSerie } from "./components/AddMovieSerie";
import { AlertModal } from "./components/AlertModal";
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import PaginaInicial from './pages/PaginaInicial'
import PaginaAvaliacoes from './pages/PaginaAvaliacoes'

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/avaliacoes" element={<PaginaAvaliacoes />} />
      </Routes>
      <AddMovieSerie setShowAddEditMovieSerie={setShowAddEditMovieSerie} showAddEditMovieSerie={showAddEditMovieSerie} setMessageAlert={setMessageAlert} />
      <AlertModal title='Ocorreu um erro' messageAlert={messageAlert} setMessageAlert={setMessageAlert} showAlert={showAlert} setShowAlert={setShowAlert} />
    </BrowserRouter>
  )
}

export default App;

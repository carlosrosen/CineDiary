import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import PaginaInicial from './pages/PaginaInicial'
import PaginaAvaliacoes from './pages/PaginaAvaliacoes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/avaliacoes" element={<PaginaAvaliacoes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

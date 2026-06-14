import {Routes, Route, BrowserRouter} from 'react-router-dom'
import PaginaInicial from './pages/PaginaInicial'
import PaginaAvaliacoes from './pages/PaginaAvaliacoes'
import PaginaCriarAvaliacao from './pages/PaginaCriarAvaliacao'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/avaliacoes" element={<PaginaAvaliacoes />} />
        <Route path="/adicionar" element={<PaginaCriarAvaliacao />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

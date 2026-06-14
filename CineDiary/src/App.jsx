import {Routes, Route, BrowserRouter} from 'react-router-dom'
import PaginaInicial from './pages/PaginaInicial'
import PaginaAvaliacoes from './pages/PaginaAvaliacoes'
import PaginaCriarAvaliacao from './pages/PaginaCriarAvaliacao'
import { AvaliacoesProvider } from './context/AvaliacoesContext'

function App() {
  return (
    <AvaliacoesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaInicial />} />
          <Route path="/avaliacoes" element={<PaginaAvaliacoes />} />
          <Route path="/adicionar" element={<PaginaCriarAvaliacao />} />
        </Routes>
      </BrowserRouter>
    </AvaliacoesProvider>
  )
}

export default App;

import './FilterBar.css';

function FilterBar({ filtro, setFiltro }){
    return (
        <nav className="filter-bar">
            <button 
                className={filtro === 'Todos' ? 'ativo' : ''} 
                onClick={() => setFiltro('Todos')}
            >
                Todos
            </button>
            <button 
                className={filtro === 'Filme' ? 'ativo' : ''} 
                onClick={() => setFiltro('Filme')}
            >
                Filmes
            </button>
            <button 
                className={filtro === 'Série' ? 'ativo' : ''} 
                onClick={() => setFiltro('Série')}
            >
                Séries
            </button>
        </nav>
    )
}

export default FilterBar;
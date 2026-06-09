import '../styles/FilterBar.css';

function FilterBar(){
    return (
        <nav className="filter-bar">
            <button>Todos</button>
            <button>Filmes</button>
            <button>Séries</button>
        </nav>
    )
}

export default FilterBar;
import '../styles/CardAvaliacao.css';

function CardAvaliacao({title, type, start_date, end_date, rating, comment}){
    return (
        <article className="review-card">
            <header className="review-card-header">
                <h1>{title}</h1>
                <span className="review-card-rating">{rating}</span>
            </header>
            <div className="review-card-type-container">
                <span className="review-card-type">{type}</span>
            </div>
            <p className="review-card-desc">{comment}</p>
            <footer className="review-footer">
                <button className="btn-editar">Editar</button>
                <button className="btn-deletar">Excluir</button>
            </footer>
        </article>   
    )
}

export default CardAvaliacao;
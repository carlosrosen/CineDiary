import { formatarData } from '../../utils/formatarData';
import './CardAvaliacao.css';

function CardAvaliacao({
  id,
  title,
  type,
  start_date,
  end_date,
  rating,
  comment,
  setEditData,
  setShowEditarAvaliacao,
}) {
  return (
    <article className="review-card">
      <header className="review-card-header">
        <h1>{title}</h1>
        <span className="review-card-rating">{rating} / 10</span>
      </header>
      <div className="review-card-type-container">
        <span className="review-card-type">{type}</span>
      </div>
      {start_date || end_date?
      <div className="review-card-dates">
        {start_date &&
        <span>
          Inicio: <time datetime={start_date}>{formatarData(start_date)}</time>
        </span>
        }
        {end_date &&
        <span>
          Conclusão: <time datetime={end_date}>{formatarData(end_date)}</time>
        </span>
        }
      </div>
      :
      null
      }
      <p className="review-card-desc">{comment}</p>
      <footer className="review-footer">
        <button
          className="btn-editar"
          onClick={() => {
            setEditData({
              id,
              title,
              type,
              start_date,
              end_date,
              rating,
              comment,
            });
            setShowEditarAvaliacao(true);
          }}
        >
          Editar
        </button>
        <button className="btn-deletar">Excluir</button>
      </footer>
    </article>
  );
}

export default CardAvaliacao;

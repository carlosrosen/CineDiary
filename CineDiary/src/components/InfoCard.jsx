import '../styles/InfoCard.css';

function InfoCard({title, value}) {
    return(
        <article className="info-card">
            <h2>{title}</h2>
            <p>{value}</p>
        </article>
    )
}

export default InfoCard;
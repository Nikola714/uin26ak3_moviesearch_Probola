export default function MovieCard({BondMovie}) {
    return(
        <>
        <article>
            <img src={BondMovie.Poster}  alt={BondMovie.Title}/>
            <h3>{BondMovie.Title}</h3>
            <p>{BondMovie.Year}</p>
            <p>{BondMovie.Type}</p>
        </article>


        </>
        
    )
}
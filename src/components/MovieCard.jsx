export default function MovieCard({movie}) {
    return(
        <article>
            <img src={movie.Poster}  alt={movie.Title}/>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <p>{movie.Type}</p>
        </article>
    )
}
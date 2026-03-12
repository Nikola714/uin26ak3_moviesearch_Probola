export default function AllMovies(movies){
    return(
        <article>
            <img src={movies.Poster}  alt={movies.Title}/>
            <h3>{movies.Title}</h3>
            <p>{movies.Year}</p>
            <p>{movies.Type}</p>
        </article>
    )
}
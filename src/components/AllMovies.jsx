import { Link } from "react-router-dom";

export default function AllMovies({ Title, Year, Type, Poster, noImage}){

    return(
        <article className="movies">
            <Link className="link" to="movie"><img className="image" src={Poster !== "N/A" ? Poster : noImage} alt={Title} /></Link>{/*ChatGPT sin kode for å få mitt bilde isteden for bilde som mangler*/}
            <Link  className="link"to="movie"><h3>{Title}</h3></Link>
            <p>{Year}</p>
            <p>{Type}</p>
        </article>
    )
}
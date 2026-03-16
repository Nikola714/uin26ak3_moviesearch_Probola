import { Link } from "react-router-dom";

export default function AllMovies({ Title, Year, Type, Poster, noImage}){

    return(
        <article className="movies">
            <Link className="link" to={`movie/:${Title}`}><img className="image" src={Poster !== "N/A" ? Poster : noImage} 
            onError={(e)=> {e.target.src= noImage}}  // Kode fra Amanda Torstensen til å fikse problem med utl for bilder som kan ikke bli lest
            alt={Title} />
            </Link>{/*ChatGPT sin kode for å få mitt bilde isteden for bilde som mangler ( https://chatgpt.com/share/69b2c926-6f14-800c-a137-3fdcd708dbb1 )*/}

            <Link  className="link" to={`movie/:${Title}`}><h3>{Title}</h3></Link> {/*Hjelp fra ChatGpt: ( https://chatgpt.com/share/69b7c533-f4bc-800c-8435-7f41917a6c9e ) */}
            <p>{Year}</p>
            <p>{Type}</p>
        </article>
    )
}



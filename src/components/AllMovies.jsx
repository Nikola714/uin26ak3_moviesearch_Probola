export default function AllMovies({ Title, Year, Type, Poster, noImage}){

    return(
        <article className="movies">
            <img className="image" src={Poster !== "N/A" ? Poster : noImage} alt={Title}/> {/*ChatGPT sin kode for å få mitt bilde isteden for bilde som mangler*/}
            <h3>{Title}</h3>
            <p>{Year}</p>
            <p>{Type}</p>
        </article>
    )
}
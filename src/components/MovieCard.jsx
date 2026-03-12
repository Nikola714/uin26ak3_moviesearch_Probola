export default function MovieCard({ Title, Year, Type, Poster, noImage }) {
    return(
        <article className="movies">
            {/*Sjekekr om Poster altså bilde er ikke "N/A isteden for kilde til bilde"
            altså hvis bilde inneholder "N/A isteden for kilde til bilde så vis "noImage" istedenfor*/}
            {/*OBS: noen bilder har kilde men viser ikke bilde uansett*/}
            <img className="image" src={Poster !== "N/A" ? Poster : noImage} alt={Title}/> {/*ChatGPT sin kode for å få mitt bilde isteden for bilde som mangler*/}
            <h3>{Title}</h3>
            <p>{Year}</p>
            <p>{Type}</p>
        </article>
    )
}
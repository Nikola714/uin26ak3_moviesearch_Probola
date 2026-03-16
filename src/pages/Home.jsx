import { useEffect, useState } from "react"
import History from "../components/History"
import MovieCard from "../components/MovieCard"
import AllMovies from "../components/AllMovies"
import noImage from "../assets/no-image.png"
import "../style/style.scss"

export default function Home(){

    const [movie, setmovie] =  useState([])


    //search → teksten brukeren skriver
    //setSearch → funksjon som oppdaterer search
    const [search, setSearch] = useState()
    const [jamesBond, setJamesBond] = useState([])

    console.log(search, "search")
    console.log(jamesBond, "state for james bond")

    //Henter tidligere søk fra nettleserens lagring
    //Returnerer string eller null
    const storedHistory = localStorage.getItem("search")

    //Focused (fokuserer på input) brukes til å vise historikk når input er aktiv.
    const [focused, setFocused] = useState(false)

    //Hvis localStorage finnes → omgjør til array
    //Hvis ikke → start med tom array
    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])
    console.log("LocalStorage:", storedHistory) //Skriver det som ligger i localstorage som text



    //lager API-url, altså lager url basert av søk
    const baseUrl = `https://www.omdbapi.com/?s=${search}&type=movie&apikey=` 

    //Henter API-nøkkel fra .env
    //GJØR SÅNN, slik at ingen ser sensetive inforrmasjon
    const apiKey = import.meta.env.VITE_APP_API_KEY


    //lagre historikk, når history endres(noen legget noe til) nøkkelord legges i localStorage som text (altså byttes fra array til text og lagrer i localStorage)
    useEffect(() => {
         localStorage.setItem("search", JSON.stringify(history))
    }, [history])



    //SØK RESULTAT

    //Asynkron funksjon for API-kall, altså hente filmer fra API basert på hva brukeren har skrevet i input felte
    const getMovies = async()=>{
        try{
            const response = await fetch(`${baseUrl}${apiKey}`)
            const data = await response.json()
            console.log("Brukeren søker etter: ", data)
            setmovie(data.Search || [])
        }
        catch(err){
            console.error(err);
        }
    }


    //JAMES BOND FILMER
    
    //Kode er skrevet med studentassistent
        //siden den kode delen funket ikke spurte jeg AI om hjelp( https://chatgpt.com/share69b00258-9050-800c-987a-491c141ba8fa )
    const getJamesBond = async() => {
        try{
            const response = await fetch(`https://www.omdbapi.com/?s=james+bond&type=movie&apikey=${apiKey}`) //url for JamesBond filmer
            const data = await response.json()
            console.log("james bond fetch :" ,data)

            setJamesBond(data.Search || [])
        }
        catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getJamesBond()
    }, []) //stopper kode fra å kjøre hele tiden




    //Når skjema sendes
    //når brukeren klikekr enter eller klikker på "Søk" knappen
   const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    // Legg til i historikk
    setHistory(prev => [...prev, search]);

    // Hent filmer basert på search
    getMovies();
}

    console.log("Brukeren søkt tidligere etter: ",history) //Skriver det brukeren søkt etter som array i json språk

    return (
    <main>
        <h1>Forside</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Søk etter film
                <input type="search" 
                    placeholder="Harry Potter" 
                    value={search || ""} 
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setFocused(true)}
                />
            </label>
        {focused ? <History history={history} setSearch={setSearch} /> : null } 
            <button onClick={getMovies}>Søk</button>
        </form>

        <section className="moviesSection">
            {/*if test fra ChatGPT ( https://chatgpt.com/share/69b7d240-1f54-800c-a246-7a3e1892ceca ) */}
            {movie && movie.length > 0 //hvis søkeresultat eller standart forside med 10 filmer av James Bond og 10 annet filmer
                ? movie.map((movieItem, UnicIndex) => (
                    <AllMovies key={movieItem.imdbID + UnicIndex} {...movieItem} noImage={noImage}/>
                )) //skriver alle filmer (altså alle indexer med tilsvarne Title, legget til UnicIndex for å beskytte at filmer med samme key som er imdbID kommer uten problem)
                : jamesBond.map((BondMovie,UnicIndex ) => (
                    <MovieCard key={BondMovie.imdbID + UnicIndex} {...BondMovie} noImage={noImage}/>
                ))
            }
        </section>


        
        
    </main>

    )
}
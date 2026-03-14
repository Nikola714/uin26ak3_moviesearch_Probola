import { useEffect, useState } from "react"
import History from "../components/History"
import MovieCard from "../components/MovieCard"
import AllMovies from "../components/AllMovies"
import noImage from "../assets/no-image.png"
import "../style/style.scss"
import { Link } from "react-router-dom"

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
    //!!!!ER IKKE I BRUKT ENNÅ!!!!!!!
    const baseUrl = `https://www.omdbapi.com/?s=${search}&type=movie&apikey=`  /*baseUrl:  http://www.omdbapi.com/?i=tt3896198&apikey=90fb6a7*/

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
            setSearch(data.Search || [])
        }
        catch(err){
            console.error(err);
        }
    }

    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

    //JAMES BOND FILMER
    
    //Kode er skrevet med studentassistent
        //siden den kode delen funket ikke spurte jeg AI om hjelp( https://chatgpt.com/share/69b00258-9050-800c-987a-491c141ba8fa )
    const getJamesBond = async() => {
        try{
            const response = await fetch(`https://www.omdbapi.com/?s=james+bond&type=movie&apikey=${apiKey}`) //url for James Bond filmer
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


    //ALLE FILMER 
    //Til å fikse problem med å få bilder på selve nettside og ikke bare i console brukte jeg hjelp av ChatGPT også for legge til ny bilde som skal vises når original bilde fra API mangles ( https://chatgpt.com/share/69b2c926-6f14-800c-a137-3fdcd708dbb1 )

    const getAllMovies = async()=> {
        try{
            const response = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=${apiKey}`)
            const data = await response.json()
            console.log("Alle filmer:" , data)

            setmovie(data.Search || [])
        }
        catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        getAllMovies()
    }, [])





    //Når skjema sendes
    //når brukeren klikekr enter eller klikker på "Søk" knappen
    const handleSubmit = (e)=> {
        e.preventDefault() //nettside skal ikke opdatere seg
        e.target.reset() //input felte tømmer seg


        //legger til nytt søk til liste og localStorage
        setHistory((prev) => [...prev, search])

       
    }

    console.log("Brukeren søkt tidligere etter: ",history) //Skriver det brukeren søkt etter som array i json språk

    return (
    <main>
        <h1>Forside</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Søk etter film
                <input type="search" placeholder="Harry Potter" onChange={handleChange} onFocus={() => setFocused(true)} /*onBlur={()=>setFocused(false)}*/></input>
            </label>
        {focused ? <History history={history} setSearch={setSearch} /> : null } 
            <button onClick={getMovies}>Søk</button>
        </form>

        <section>
            Filmer
            <Link to="movie">Filmer</Link>
        </section>
        <section className="moviesSection">
            {jamesBond?.map(BondMovie => (
                <MovieCard key={BondMovie.imdbID} {...BondMovie} noImage={noImage}/>
            ))}

            {movie?.map(movieItem => (
                <AllMovies key={movieItem.imdbID} {...movieItem} noImage={noImage}/>
            ))}
        </section>


        
        
    </main>

    )
}
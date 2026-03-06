import { useEffect, useState } from "react"
import History from "../components/History"

export default function Home(){
    //search → teksten brukeren skriver
    //setSearch → funksjon som oppdaterer search
    const [search, setSearch] = useState()

    //Henter tidligere søk fra nettleserens lagring
    //Returnerer string eller null
    const storedHistory = localStorage.getItem("search")

    //Focused (fokuserer på input) brukes til å vise historikk når input er aktiv.
    const [focused, setFocused] = useState(false)

    //Hvis localStorage finnes → omgjør til array
    //Hvis ikke → start med tom array
    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])
    console.log("Denne kommer fra storage", storedHistory)

    //lager API-url, altså lager url basert av søk
    //!!!!ER IKKE I BRUKT ENNÅ!!!!!!!
    const baseUrl = `http://www.omdbapi.com/?s=${search}&apikey=`

    //Henter API-nøkkel fra .env
    //GJØR SÅNN, slik at ingen ser sensetive inforrmasjon
    const apiKey = import.meta.env.VITE_APP_API_KEY


    //lagre historikk, når history endres(noen legget noe til) nøkkelord legges i localStorage som text (altså byttes fra array til text og lagrer i localStorage)
    useEffect(() => {
         localStorage.setItem("search", JSON.stringify(history))
    }, [history])

    const getMovies = async()=>{
        try{
            const response = await fetch(`${baseUrl}${apiKey}`)
            const data = await response.json()
            console.log(data)
        }
        catch(err){
            console.error(err);
        }
    }

    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

    const handleSubmit = (e)=> {
        e.preventDefault()
        e.target.reset()

        setHistory((prev) => [...prev, search])

       
    }

    console.log(history)

    return (
    <main>
        <h1>Forside</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Søk etter film
                <input type="search" placeholder="Harry Potter" onChange={handleChange} onFocus={() => setFocused(true)} /*onBlur={()=>setFocused(false)}*/></input>
            </label>
        { focused ? <History history={history} setSearch={setSearch} /> : null } 
            <button onClick={getMovies}>Søk</button>
        </form>
    </main>

    )
}
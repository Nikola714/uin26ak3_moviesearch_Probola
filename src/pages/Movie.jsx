import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

//hjelp fra ChatGPT: ( https://chatgpt.com/share/69b7c533-f4bc-800c-8435-7f41917a6c9e )

export default function Movie(){

    {/*ChatGPT anbefalte meg definere apiKey på nytt i denne komponent */}
    const apiKey = import.meta.env.VITE_APP_API_KEY

    const {movie} = useParams()
    const [movieInfo, setMovieInfo] = useState()
    const getMovie = async()=>{
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`) //ChatGPT hjulpet meg med å skrive riktig url og med å få apiKey til å funke i denne komponent 
        const data = await response.json()
        setMovieInfo(data)
        console.log(data)
        console.log(movie)
    }

    useEffect(()=>{
        getMovie()
    },[movie])

    return (
        <main>
            <h1>{movieInfo?.Title}</h1>
        </main>
    )
}
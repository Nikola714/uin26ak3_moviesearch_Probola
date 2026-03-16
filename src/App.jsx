import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Movie from './pages/Movie'

function App({apiKey}) {
  const [count, setCount] = useState(0)

  return (
   <Routes>
    <Route index element={<Home apiKey={apiKey}/>}/>
    {/*ChatGPT hjulpet meg med å skrive den sånn ( https://chatgpt.com/share/69b7c533-f4bc-800c-8435-7f41917a6c9e ) */}
    <Route path="movie" element={<Movie apiKey={apiKey}/>}/>
    <Route path="movie/:movie" element={<Movie apiKey={apiKey}/>} /> {/* viser movie/nameOfMovie*/}
   </Routes>
  )
}

export default App

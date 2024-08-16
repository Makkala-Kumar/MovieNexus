import React from 'react'
import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import TVShows from './pages/Tvshows/Tvshows'
import NewAndPopular from './pages/NewAndPopular/NewAndPopular'
import Navbar from './components/Navbar/Navbar'
import Movies from './pages/Movies/Movies'

const App = () => {
  return (
    <>
    <Navbar/>
    <div>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
        <Route path='/tvshows' element={<TVShows/>}/>
        <Route path='/new' element={<NewAndPopular/>}/>
        <Route path='/movie' element={<Movies/>}/>
      </Routes>


    </div>
    </>
  )
}

export default App

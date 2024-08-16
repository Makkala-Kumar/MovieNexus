import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import TVShows from './pages/Tvshows/Tvshows'
import NewAndPopular from './pages/NewAndPopular/NewAndPopular'
import Movies from './pages/Movies/Movies'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      if(user){
        console.log("Logged In");
        navigate('/');
      }else{
        console.log("Logged Out");
        navigate('/login');
      }
    })
  })

  return (
    <>
    <div>
    <ToastContainer theme='dark' />
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

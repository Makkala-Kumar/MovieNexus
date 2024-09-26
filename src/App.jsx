import React, { useEffect } from 'react';
import Home from './pages/Home/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import TVShows from './pages/Tvshows/Tvshows';
import NewAndPopular from './pages/NewAndPopular/NewAndPopular';
import Navbar from './components/Navbar/Navbar';
import Movies from './pages/Movies/Movies';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Movie from './pages/Mdetail/Mdetail';
import Watchlist from './pages/Watchlist/Watchlist';
import UserPage from './pages/UserPage/UserPage'; 
import Indian from './pages/Indian/Indian'; 
import Global from './pages/Global/Global'; 
import TVShowDetail from './pages/TVShowDetail/TVShowDetail';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In");
        navigate('/');
      } else {
        console.log("Logged Out");
        navigate('/login');
      }
    });
  }, []); 

  return (
    <>
      <div>
        <ToastContainer theme='dark' />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/player/:id' element={<Player />} />
          <Route path='/indian' element={<Indian />} />
          <Route path='/global' element={<Global />} />
          <Route path='/tvshows' element={<TVShows />} />
          <Route path='/new' element={<NewAndPopular />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/movie/:id' element={<Movie />} />
          <Route path='/user' element={<UserPage />} /> 
          <Route path="/tv/:id" element={<TVShowDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

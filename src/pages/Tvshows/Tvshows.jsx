import React from 'react';
import './Tvshows.css';
import Navbar from '../../components/Navbar/Navbar';
import TitleCards from '../../components/Titlecards/TitleCards';
import Footer from '../../components/Footer/Footer';

const TVShows = () => {
  return (
    <div className='tvshows'>
      <Navbar />

      <div className='more-cards'>

      <TitleCards title={"Top Rated TV Shows"} category={"top_rated"} contentType={"tv"} />
      <TitleCards title={"Trending Now"} category={"popular"} contentType={"tv"} />
      <TitleCards title={"Airing Today"} category={"airing_today"} contentType={"tv"} />
      <TitleCards title={"On the Air"} category={"on_the_air"} contentType={"tv"} />
      </div>
      <Footer />
    </div>
  );
}

export default TVShows;

import React from 'react';
import './Tvshows.css';
import Navbar from '../../components/Navbar/Navbar';
import TVShowCards from '../../components/TVShowsCards/TVShowsCards';
import Footer from '../../components/Footer/Footer';

const TVShows = () => {
  return (
    <div className='tvshows'>
      <Navbar />
      <div className='more-cards'>
        <TVShowCards title={"Top Rated TV Shows"} category={"top_rated"} />
        <TVShowCards title={"Trending Now"} category={"popular"} />
        <TVShowCards title={"On the Air"} category={"on_the_air"} />
      </div>
      <Footer />
    </div>
  );
}

export default TVShows;

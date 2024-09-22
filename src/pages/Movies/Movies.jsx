import React from 'react';
import './Movies.css';
import Navbar from '../../components/Navbar/Navbar';
import TitleCards from '../../components/Titlecards/TitleCards';
import Footer from '../../components/Footer/Footer';

const Movies = () => {
  return (
    <div className='movies'>
      <Navbar />

      <div className='more-cards'>
        <TitleCards title={"Blockbuster Hits"} category={"top_rated"} />
        <TitleCards title={"Popular Movies"} category={"popular"} />
        <TitleCards title={"Coming Soon"} category={"upcoming"} />
        <TitleCards title={"Movies You'll Love"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
}

export default Movies;

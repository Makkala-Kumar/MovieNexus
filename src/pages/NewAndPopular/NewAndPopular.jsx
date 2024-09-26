import React from 'react';
import './NewAndPopular.css';
import Navbar from '../../components/Navbar/Navbar';
import TitleCards from '../../components/Titlecards/TitleCards';
import TVShowCards from '../../components/TVShowsCards/TVShowsCards';
import Footer from '../../components/Footer/Footer';

const NewAndPopular = () => {
  return (
    <div className='new-and-popular'>
      <Navbar />

      <div className='more-cards'>
      <TitleCards title={"New Movies"} category={"upcoming"} contentType={"movie"} />
      <TitleCards title={"Popular Movies"} category={"popular"} contentType={"movie"} />
      <TVShowCards title={"Airing Today"} category={"airing_today"} contentType={"tv"} />
      <TVShowCards title={"Popular"} category={"popular"} contentType={"tv"} />
      </div>
      <Footer />
    </div>
  );
}

export default NewAndPopular;

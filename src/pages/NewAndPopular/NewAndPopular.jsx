import React from 'react';
import './NewAndPopular.css';
import Navbar from '../../components/Navbar/Navbar';
import TitleCards from '../../components/Titlecards/TitleCards';
import Footer from '../../components/Footer/Footer';

const NewAndPopular = () => {
  return (
    <div className='new-and-popular'>
      <Navbar />

      <div className='more-cards'>
      <TitleCards title={"New Movies"} category={"upcoming"} contentType={"movie"} />
      <TitleCards title={"Popular Movies"} category={"popular"} contentType={"movie"} />
      <TitleCards title={"New TV Shows"} category={"airing_today"} contentType={"tv"} />
      <TitleCards title={"Popular TV Shows"} category={"popular"} contentType={"tv"} />
      </div>
      <Footer />
    </div>
  );
}

export default NewAndPopular;

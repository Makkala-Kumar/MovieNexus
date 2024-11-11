import React from 'react';
import './Global.css';
import Navbar from '../../components/Navbar/Navbar';
import TitleCards from '../../components/Titlecards/TitleCards';
import Footer from '../../components/Footer/Footer';

const Global = () => {
  return (
    <div className='global'>
      <Navbar />

      <div className='more-cards'>

      <TitleCards title={"BlockBuster Movies"} category={"top_rated"} />
        <TitleCards title={"Available only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top picks"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
}

export default Global;

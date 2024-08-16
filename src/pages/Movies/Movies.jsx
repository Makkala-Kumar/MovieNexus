import React from 'react';
import './Movies.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

const Movies = () => {
  return (
    <div className='movies'>
      <Navbar />
      <div className='hero'>
        <img src={hero_banner} alt="" className='banner-img' />
        <div className='hero-caption'>
          <img src={hero_title} alt="" className='caption-img' />
          <p>Discover Great Movies</p>
          <div className='hero-btns'>
            <button className='btn'><img src={play_icon} alt="" />Play</button>
            <button className='btn dark-btn'><img src={info_icon} alt="" />Info</button>
          </div>
          <TitleCards />
        </div>
      </div>
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

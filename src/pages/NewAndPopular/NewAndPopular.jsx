import React from 'react';
import './NewAndPopular.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

const NewAndPopular = () => {
  return (
    <div className='new-and-popular'>
      <Navbar />
      <div className='hero'>
        <img src={hero_banner} alt="" className='banner-img' />
        <div className='hero-caption'>
          <img src={hero_title} alt="" className='caption-img' />
          <p>What's New & Popular</p>
          <div className='hero-btns'>
            <button className='btn'><img src={play_icon} alt="" />Play</button>
            <button className='btn dark-btn'><img src={info_icon} alt="" />Info</button>
          </div>
          <TitleCards />
        </div>
      </div>
      <div className='more-cards'>
        <TitleCards title={"Trending Now"} category={"top_rated"} />
        <TitleCards title={"New on Netflix"} category={"popular"} />
        <TitleCards title={"Just Released"} category={"upcoming"} />
        <TitleCards title={"Popular Picks"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
}

export default NewAndPopular;

import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/Titlecards/TitleCards'
import Footer from '../../components/Footer/Footer';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";

const Home = () => {

  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
      .then(res => res.json())
      .then(data => setPopularMovies(data.results));
  }, []);

  return (
    <div className='home'>
      <Navbar />
      <div className='hero'>
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={4}
          infiniteLoop={true}
          showStatus={false}
        >
          {popularMovies.map(movie => (
            <Link style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`} key={movie.id}>
              <div className="posterImage">
                <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt={movie.original_title} />
              </div>
              <div className="posterImage__overlay">
                {/* <img src={hero_title} alt="Hero Title" className='caption-img' /> */}
                <div className="posterImage__title">{movie ? movie.original_title : ""}</div>
                <div className="posterImage__runtime">
                  {movie ? movie.release_date : ""}
                  {/* <span className="posterImage__rating">
                    {movie ? movie.vote_average : ""}
                    <i className="fas fa-star" />
                  </span> */}
                </div>
                {/* <div className="posterImage__description">{movie ? movie.overview : ""}</div> */}
                {/* <div className='hero-btns'> */}
                  {/* <button className='btn'><img src={play_icon} alt="" />Play</button> */}
                  {/* <button className='btn dark-btn'><img src={info_icon} alt="" />info</button> */}
                {/* </div> */}
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
      <div className='more-cards'>
        <TitleCards title={"BlockBuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on Nexus"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top picks for you"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;

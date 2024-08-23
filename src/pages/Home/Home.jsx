import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import TitleCards from "../../components/Titlecards/TitleCards";
import Footer from "../../components/Footer/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [movieLogos, setMovieLogos] = useState({});

  const apiKey = "4e44d9029b1270a757cddc766a1bcb63";  // Directly assigning your API key

  useEffect(() => {
    // Fetching genres
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(data => {
        const genreMap = {};
        data.genres.forEach(genre => {
          genreMap[genre.id] = genre.name;
        });
        setGenres(genreMap);
      });

    // Fetching popular movies
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(data => {
        setPopularMovies(data.results);

        // Fetching logos for each movie
        data.results.forEach(movie => {
          fetch(`https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=${apiKey}`)
            .then(res => res.json())
            .then(imageData => {
              const logos = imageData.logos || [];
              if (logos.length > 0) {
                setMovieLogos(prevLogos => ({
                  ...prevLogos,
                  [movie.id]: logos.find(logo => logo.language === 'en')?.file_path || logos[0].file_path
                }));
              }
            });
        });
      });
  }, [apiKey]);

  const addToWatchlist = (movie) => {
    if (!movie) return;

    let savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const isAlreadyInWatchlist = savedWatchlist.some(m => m.id === movie.id);

    if (!isAlreadyInWatchlist) {
      const movieWithStatus = { ...movie, status: 'Watching' }; // Default status
      savedWatchlist.push(movieWithStatus);
      localStorage.setItem("watchlist", JSON.stringify(savedWatchlist));
      alert("Movie added to watchlist!");
    } else {
      alert("This movie is already in your watchlist.");
    }
  };

  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
          className="carousel"
        >
          {popularMovies.map((movie) => (
            <Link style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`} key={movie.id}>
              <div className="posterImage">
                <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt={movie.original_title} />
                <div className="posterImage__overlay">
                  <div className="posterImage__logo-title">
                    {movieLogos[movie.id] ? (
                      <img 
                        src={`https://image.tmdb.org/t/p/original${movieLogos[movie.id]}`} 
                        alt={movie.original_title} 
                        className="movie-logo" 
                      />
                    ) : null}
                    <div className="posterImage__title">{movie.original_title}</div>
                  </div>
                  <div className="posterImage__genre">
                    {movie.genre_ids ? movie.genre_ids.map((id) => (
                      <span key={id} className="movie__genre">{genres[id] || "Unknown"}</span>
                    )) : ""}
                  </div>
                  <div className="button-container">
                    <button className="watch-now-btn">Watch Now</button>
                    <button 
                      className="add-to-watchlist-btn" 
                      title="Add to Watchlist"
                      onClick={() => addToWatchlist(movie)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
      <div className="more-cards">
        <TitleCards title={"BlockBuster Movies"} category={"top_rated"} />
        <TitleCards title={"Available only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top picks"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;

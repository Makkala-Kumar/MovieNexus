import React, { useState, useEffect } from "react";
import "./Mdetail.css";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState(null);
    const [watchlistStatus, setWatchlistStatus] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getData();
        window.scrollTo(0, 0);
    }, []);

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                // Load watchlist and set status
                const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
                const movieInWatchlist = savedWatchlist.find(movie => movie.id === data.id);
                setWatchlistStatus(movieInWatchlist ? movieInWatchlist.status : null);
            });
    };

    const addToWatchlist = () => {
        if (!currentMovieDetail) return;

        let savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        const isAlreadyInWatchlist = savedWatchlist.some(movie => movie.id === currentMovieDetail.id);

        if (!isAlreadyInWatchlist) {
            const movieWithStatus = { ...currentMovieDetail, status: 'Watching' }; // Default status
            savedWatchlist.push(movieWithStatus);
            localStorage.setItem("watchlist", JSON.stringify(savedWatchlist));
            setWatchlistStatus('Watching'); // Update button to dropdown
            alert("Movie added to watchlist!");
        } else {
            alert("This movie is already in your watchlist.");
        }
    };

    const handleCategoryChange = (category) => {
        if (!currentMovieDetail) return;

        let savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        const updatedWatchlist = savedWatchlist.map(movie => 
            movie.id === currentMovieDetail.id ? { ...movie, status: category } : movie
        );
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
        setWatchlistStatus(category);
    };

    return (
        <div className="movie">
            <Navbar />
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average : ""} <i className="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <span key={genre.id} className="movie__genre">{genre.name}</span>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                </div>
            </div>
            <div className="movie__links">
                
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    watchlistStatus === null 
                    ? <button onClick={addToWatchlist} className="add-to-watchlist-button">Add to Watchlist</button>
                    : <div className="watchlist-dropdown">
                        <button className="dropdown-button">{watchlistStatus}</button>
                        <div className="dropdown-content">
                            <a onClick={() => handleCategoryChange('Watching')}>Watching</a>
                            <a onClick={() => handleCategoryChange('Completed')}>Completed</a>
                            <a onClick={() => handleCategoryChange('Dropped')}>Dropped</a>
                            <a onClick={() => handleCategoryChange('Plan to Watch')}>Plan to Watch</a>
                        </div>
                      </div>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                        company.logo_path && 
                        <span key={company.id} className="productionCompanyImage">
                            <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                            <span>{company.name}</span>
                        </span>
                    ))
                }
            </div>
        </div>
    );
}

export default Movie;

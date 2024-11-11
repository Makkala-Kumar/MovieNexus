import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./TVShowDetail.css";

const TVShowDetail = () => {
    const [currentShowDetail, setShow] = useState(null);
    const [watchlistStatus, setWatchlistStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`);
                if (!response.ok) {
                    throw new Error('Failed to fetch show details');
                }
                const data = await response.json();
                setShow(data);

                // Load watchlist and set status
                const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
                const showInWatchlist = savedWatchlist.find(show => show.id === data.id);
                setWatchlistStatus(showInWatchlist ? showInWatchlist.status : null);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchShowDetails();
    }, [id]);

    const addToWatchlist = () => {
        if (!currentShowDetail) return;

        let savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        const isAlreadyInWatchlist = savedWatchlist.some(show => show.id === currentShowDetail.id);

        if (!isAlreadyInWatchlist) {
            const showWithStatus = { ...currentShowDetail, status: 'Watching' }; // Default status
            savedWatchlist.push(showWithStatus);
            localStorage.setItem("watchlist", JSON.stringify(savedWatchlist));
            setWatchlistStatus('Watching'); // Update button to dropdown
            alert("Show added to watchlist!");
        } else {
            alert("This show is already in your watchlist.");
        }
    };

    const handleCategoryChange = (category) => {
        if (!currentShowDetail) return;

        let savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        const updatedWatchlist = savedWatchlist.map(show => 
            show.id === currentShowDetail.id ? { ...show, status: category } : show
        );
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
        setWatchlistStatus(category);
    };

    return (
        <div className="movie">
            <Navbar />
            {isLoading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {currentShowDetail && (
                <>
                    <div className="movie__intro">
                        <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentShowDetail.backdrop_path}`} alt={currentShowDetail.name} />
                    </div>
                    <div className="movie__detail">
                        <div className="movie__detailLeft">
                            <div className="movie__posterBox">
                                <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentShowDetail.poster_path}`} alt={currentShowDetail.name} />
                            </div>
                        </div>
                        <div className="movie__detailRight">
                            <div className="movie__name">{currentShowDetail.name}</div>
                            <div className="movie__tagline">{currentShowDetail.tagline}</div>
                            <div className="movie__genres">
                                {currentShowDetail.genres.map(genre => (
                                    <span key={genre.id} className="movie__genre">{genre.name}</span>
                                ))}
                            </div>
                            <div className="synopsisText">Synopsis</div>
                            <div>{currentShowDetail.overview}</div>
                        </div>
                    </div>
                    <div className="movie__links">
                        {currentShowDetail.homepage && (
                            <a href={currentShowDetail.homepage} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                                <p>
                                    <span className="movie__homeButton movie__Button">Watch Here <i className="newTab fas fa-external-link-alt"></i></span>
                                </p>
                            </a>
                        )}
                        {watchlistStatus === null ? (
                            <button onClick={addToWatchlist} className="add-to-watchlist-button">Add to Watchlist</button>
                        ) : (
                            <div className="watchlist-dropdown">
                                <button className="dropdown-button">{watchlistStatus}</button>
                                <div className="dropdown-content">
                                    <a onClick={() => handleCategoryChange('Watching')}>Watching</a>
                                    <a onClick={() => handleCategoryChange('Completed')}>Completed</a>
                                    <a onClick={() => handleCategoryChange('Dropped')}>Dropped</a>
                                    <a onClick={() => handleCategoryChange('Plan to Watch')}>Plan to Watch</a>
                                </div>
                            </div>
                        )}
                        {currentShowDetail.imdb_id && (
                            <a href={`https://www.imdb.com/title/${currentShowDetail.imdb_id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                                <p>
                                    <span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span>
                                </p>
                            </a>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default TVShowDetail;

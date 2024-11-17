import React, { useEffect, useState } from "react";
import "./Mdetail.css";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const Movie = () => {
    const [currentDetail, setDetail] = useState(null);
    const [youtubeLink, setYoutubeLink] = useState("");
    const [watchlistStatus, setWatchlistStatus] = useState(null);
    const [ottLinks, setOttLinks] = useState([]); // State for OTT links
    const { id } = useParams(); // Get the 'id' from the URL
    const location = useLocation(); // Get the current URL to determine if it's a TV show or movie

    // Determine type based on URL (tv or movie)
    const type = location.pathname.includes('/tv/') ? 'tv' : 'movie';

    useEffect(() => {
        setDetail(null); // Clear old data before fetching new details
        getData();       // Fetch new data based on 'id' and 'type'
        window.scrollTo(0, 0); // Scroll to top when a new item is loaded
    }, [id, type]);  // Trigger useEffect when 'id' or 'type' changes

    const getData = async () => {
        const endpoint = type === "tv" ? `tv/${id}` : `movie/${id}`;
        const ottEndpoint = type === "tv" ? `tv/${id}/watch/providers` : `movie/${id}/watch/providers`;

        try {
            // Fetch movie or TV show details
            const detailRes = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`);
            const detailData = await detailRes.json();
            setDetail(detailData);

            // Fetch OTT providers information
            const ottRes = await fetch(`https://api.themoviedb.org/3/${ottEndpoint}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`);
            const ottData = await ottRes.json();
            const providers = ottData.results?.US?.flatrate || []; // Use 'US' region as default; adjust if needed
            setOttLinks(providers);

            // Fetch the YouTube trailer link
            fetchYoutubeLink();

            // Check watchlist status from localStorage
            const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
            const itemInWatchlist = savedWatchlist.find(item => item.id === detailData.id);
            setWatchlistStatus(itemInWatchlist ? itemInWatchlist.status : null);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchYoutubeLink = () => {
        const endpoint = type === "tv" ? `tv/${id}/videos` : `movie/${id}/videos`;
        fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then(res => res.json())
            .then(data => {
                const trailer = data.results.find(video => video.site === "YouTube" && video.type === "Trailer");
                if (trailer) {
                    setYoutubeLink(`https://www.youtube.com/watch?v=${trailer.key}`);
                }
            });
    };

    const addToWatchlist = () => {
        if (!currentDetail) return;

        const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        const isAlreadyInWatchlist = savedWatchlist.some(item => item.id === currentDetail.id);

        if (!isAlreadyInWatchlist) {
            const itemWithStatus = { ...currentDetail, status: 'Watching' };
            savedWatchlist.push(itemWithStatus);
            localStorage.setItem("watchlist", JSON.stringify(savedWatchlist));
            setWatchlistStatus('Watching');
            alert("Item added to watchlist!");
        } else {
            alert("This item is already in your watchlist.");
        }
    };

    const handleCategoryChange = (category) => {
        if (!currentDetail) return;

        const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        const updatedWatchlist = savedWatchlist.map(item =>
            item.id === currentDetail.id ? { ...item, status: category } : item
        );
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
        setWatchlistStatus(category);
    };

    return (
        <div className="movie">
            <nav className="navbar">
        <Navbar />
  </nav>
            <div className="movie__intro">
                <img
                    className="movie__backdrop"
                    src={`https://image.tmdb.org/t/p/original${currentDetail ? currentDetail.backdrop_path : ""}`}
                    alt="Backdrop"
                />
            </div>

            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img
                            className="movie__poster"
                            src={`https://image.tmdb.org/t/p/original${currentDetail ? currentDetail.poster_path : ""}`}
                            alt="Poster"
                        />
                    </div>
                </div>

                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">
                            {currentDetail ? (type === "tv" ? currentDetail.name : currentDetail.original_title) : ""}
                        </div>
                        <div className="movie__tagline">
                            {currentDetail ? currentDetail.tagline : ""}
                        </div>
                        <div className="movie__rating">
                            {currentDetail ? currentDetail.vote_average : ""} <i className="fas fa-star" />
                            <span className="movie__voteCount">
                                {currentDetail ? `(${currentDetail.vote_count} votes)` : ""}
                            </span>
                        </div>
                        <div className="movie__runtime">
                            {currentDetail ? `${currentDetail.runtime || currentDetail.episode_run_time[0]} mins` : ""}
                        </div>
                        <div className="movie__releaseDate">
                            {currentDetail ? `Release date: ${currentDetail.release_date || currentDetail.first_air_date}` : ""}
                        </div>
                        <div className="movie__genres">
                            {currentDetail && currentDetail.genres && currentDetail.genres.map(genre => (
                                <span className="movie__genre" id={genre.id} key={genre.id}>
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>
                            {currentDetail ? currentDetail.overview : ""}
                        </div>
                    </div>
                </div>
            </div>

            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {currentDetail && currentDetail.homepage && (
                    <a
                        href={currentDetail.homepage}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "none" }}
                    >
                        <p>
                            <span className="movie__homeButton movie__Button">
                                Homepage <i className="newTab fas fa-external-link-alt"></i>
                            </span>
                        </p>
                    </a>
                )}
                {currentDetail && currentDetail.imdb_id && (
                    <a
                        href={`https://www.imdb.com/title/${currentDetail.imdb_id}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "none" }}
                    >
                        <p>
                            <span className="movie__imdbButton movie__Button">
                                IMDb <i className="newTab fas fa-external-link-alt"></i>
                            </span>
                        </p>
                    </a>
                )}
                {youtubeLink && (
                    <a
                        href={youtubeLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "none" }}
                    >
                        <p>
                            <span className="movie__youtubeButton movie__Button">
                                YouTube <i className="newTab fas fa-external-link-alt"></i>
                            </span>
                        </p>
                    </a>
                )}
                {watchlistStatus === null ? (
                    <button onClick={addToWatchlist} className="add-to-watchlist-button">
                        Add to Watchlist
                    </button>
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

                {/* Adding OTT Links in the same section */}
                {ottLinks && ottLinks.length > 0 ? (
                    <div className="movie__heading">Available On</div>
                ) : (
                    <p>No OTT links available</p>
                )}
                {ottLinks.map(provider => (
                    <a
                        key={provider.provider_id}
                        href={`https://www.${provider.provider_name.replace(" ", "").toLowerCase()}.com`}
                        target="_blank"
                        rel="noreferrer"
                        className="ott-button"
                    >
                        {provider.provider_name}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Movie;   
 


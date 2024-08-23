import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Ensure you have this import
import "./Watchlist.css";
import Navbar from "../../components/Navbar/Navbar";

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All Movies');
    const navigate = useNavigate(); // Initialize the navigation hook

    useEffect(() => {
        const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        setWatchlist(savedWatchlist);
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`); // Use the navigate function for redirection
    };

    const filteredMovies = selectedCategory === 'All Movies' 
        ? watchlist 
        : watchlist.filter(movie => movie.status === selectedCategory);

    return (
        <div className="watchlist">
          <Navbar />
            <h1>Your Watchlist</h1>
            <div className="watchlist-categories">
                <button className="category-button" onClick={() => handleCategoryChange('All Movies')}>All Movies</button>
                <button className="category-button" onClick={() => handleCategoryChange('Watching')}>Watching</button>
                <button className="category-button" onClick={() => handleCategoryChange('Completed')}>Completed</button>
                <button className="category-button" onClick={() => handleCategoryChange('Dropped')}>Dropped</button>
                <button className="category-button" onClick={() => handleCategoryChange('Plan to Watch')}>Plan to Watch</button>
            </div>
            <div className="watchlist-movies">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map(movie => (
                        <div 
                            key={movie.id} 
                            className="watchlist-movie" 
                            onClick={() => handleMovieClick(movie.id)} // Add click handler
                        >
                            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                            <p>{movie.title}</p>
                        </div>
                    ))
                ) : (
                    <p>No movies in this category.</p>
                )}
            </div>
        </div>
    );
};

export default Watchlist;

import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const TitleCards = ({ title, category, contentType = "movie", language }) => {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmVhOTg4YzVlMjAzZDgzNjQ1NGFlYTViYmE4OGE4YyIsIm5iZiI6MTcyMzU3MDIyNC4xODI3MTQsInN1YiI6IjY2YmI5NjhjMGZiMzFhYTM5YTBmMWQwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yUAR5lIN6MJDJ94aaLl9J44x60oGMgwCDy20jLGwmuk",
    },
  };

  useEffect(() => {
    const endpoint = contentType === "tv" ? "tv" : "movie"; // Switch between movie and tv
    let url;

    if (language) {
      url = `https://api.themoviedb.org/3/discover/${endpoint}?language=en&with_original_language=${language}&page=1`;
    } else {
      url = `https://api.themoviedb.org/3/${endpoint}/${category ? category : "now_playing"}?language=en&page=1`;
    }

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        // Filter the results for released movies with backdrops
        const filteredResults = response.results.filter((movie) => {
          const releaseDate = new Date(movie.release_date);
          const today = new Date();
          return (
            releaseDate <= today && // Released today or earlier
            movie.backdrop_path // Only include if there is a backdrop
          );
        });
        setApiData(filteredResults);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); // Stop loading even if there's an error
      });

    cardsRef.current.addEventListener("wheel", (event) => {
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
    });
  }, [category, contentType, language]);

  return (
    <div className="titlecards">
      <h2>{title ? title : "Popular Content"}</h2>
      <div className="card-list" ref={cardsRef}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div className="card" key={index}>
                <SkeletonTheme color="#202020" highlightColor="#444">
                  <Skeleton height={135} width={240} duration={2} />
                  <Skeleton height={20} width={`60%`} style={{ marginTop: '10px' }} />
                </SkeletonTheme>
              </div>
            ))
          : apiData.length > 0 ? (
              apiData.map((card, index) => (
                <Link to={`/${contentType}/${card.id}`} className="card" key={index}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                    alt={card.original_title || card.name} // Use appropriate title
                  />
                  <p>{card.title || card.original_title || card.name}</p> {/* Use 'title' if available, otherwise fall back to 'original_title' or 'name' */}
                </Link>
              ))
            ) : (
              <p>No movies available.</p> // Message if no movies meet the criteria
            )}
      </div>
    </div>
  );
};

export default TitleCards;

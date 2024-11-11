import React, { useEffect, useRef, useState } from "react";
import "./TVShowsCards.css"; 
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const TVShowCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmVhOTg4YzVlMjAzZDgzNjQ1NGFlYTViYmE4OGE4YyIsIm5iZiI6MTcyMzU3MDIyNC4xODI3MTQsInN1YiI6IjY2YmI5NjhjMGZiMzFhYTM5YTBmMWQwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yUAR5lIN6MJDJ94aaLl9J44x60oGMgwCDy20jLGwmuk",
    },
  };

  useEffect(() => {
    const endpoint = `tv/${category}`;
    const url = `https://api.themoviedb.org/3/${endpoint}?language=en-US&page=1`;

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the data for debugging
        setApiData(data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setIsLoading(false);
      });

    const handleWheel = (event) => {
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY; // Scroll horizontally based on vertical scroll
    };

    const currentRef = cardsRef.current;
    currentRef.addEventListener("wheel", handleWheel);

    // Cleanup the event listener on component unmount
    return () => {
      currentRef.removeEventListener("wheel", handleWheel);
    };
  }, [category]);

  return (
    <div className="titlecards">
      <h2>{title ? title : "Popular TV Shows"}</h2>
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
              apiData.map((show) => (
                <Link to={`/tv/${show.id}`} className="card" key={show.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
                    alt={show.original_name}
                  />
                  <p>{show.name || show.original_name}</p>
                </Link>
              ))
            ) : (
              <p>No TV shows available.</p>
            )}
      </div>
    </div>
  );
};

export default TVShowCards;

import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const TitleCards = ({ title, category, contentType = "movie" }) => {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmVhOTg4YzVlMjAzZDgzNjQ1NGFlYTViYmE4OGE4YyIsIm5iZiI6MTcyMzU3MDIyNC4xODI3MTQsInN1YiI6IjY2YmI5NjhjMGZiMzFhYTM5YTBmMWQwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yUAR5lIN6MJDJ94aaLl9J44x60oGMgwCDy20jLGwmuk",
    },
  };

  useEffect(() => {
    const endpoint = contentType === "tv" ? "tv" : "movie"; // Switch between movie and tv

    fetch(
      `https://api.themoviedb.org/3/${endpoint}/${category ? category : "now_playing"}?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setApiData(response.results);
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
  }, [category, contentType]);

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
          : apiData.map((card, index) => (
              <Link to={`/${contentType}/${card.id}`} className="card" key={index}>
                <img
                  src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                  alt={card.original_title || card.name} // Use appropriate title
                />
                <p>{card.original_title || card.name}</p> {/* Movie title or TV show name */}
              </Link>
            ))}
      </div>
    </div>
  );
};

export default TitleCards;

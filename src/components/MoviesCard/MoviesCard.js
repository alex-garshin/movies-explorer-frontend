import React, { useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import CardLike from "../../images/save-card.svg";
import CardLikeActive from "../../images/save-card-active.svg";

import "./MoviesCard.css";

const MoviesCard = ({
  movie,
  isSavedMoviesPage,
  onSaveMovie,
  onDeleteMovie,
}) => {
  const [isMouseInCard, setIsMouseInCard] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width < 768;
  const cardRef = useRef();
  const cardDeleteButtonClassName = "link card__del-button";

  useEffect(() => {
    const card = cardRef.current;
    let mouseOverListener, mouseLeaveListener;
    if (card) {
      mouseOverListener = card.addEventListener("mouseover", () => {
        setIsMouseInCard(true);
      });
      mouseLeaveListener = card.addEventListener("mouseleave", () => {
        setIsMouseInCard(false);
      });
    }

    return () => {
      if (card) {
        card.removeEventListener("mouseover", mouseOverListener);
        card.removeEventListener("mouseleave", mouseLeaveListener);
      }
    };
  }, [cardRef.current]);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  function handleSaveClick() {
    onSaveMovie(movie);
  }

  function handleDeleteClick() {
    onDeleteMovie(movie);
  }

  return (
    <li className="card" ref={cardRef}>
      <img className="card__image" src={movie.image} alt={movie.name} />
      <div className="card__wrapper">
        <h3 className="card__name">{movie.name}</h3>
        {!isSavedMoviesPage && (
          <button
            className="card__like"
            type="button"
            aria-label="Сохранить в коллекцию"
            onClick={handleSaveClick}
          >
            {movie.isLiked ? (
              <ReactSVG src={CardLikeActive} />
            ) : (
              <ReactSVG src={CardLike} />
            )}
          </button>
        )}
        {isMouseInCard && isSavedMoviesPage && !isMobile && !isMobile && (
          <button
            className={cardDeleteButtonClassName}
            type="button"
            aria-label="Удалить"
            onClick={handleDeleteClick}
          />
        )}
        {isMobile && isSavedMoviesPage && (
          <button
            className={cardDeleteButtonClassName}
            type="button"
            aria-label="Удалить"
            onClick={handleDeleteClick}
          />
        )}
      </div>
      <p className="card__duration">{movie.duration}</p>
    </li>
  );
};

export default MoviesCard;

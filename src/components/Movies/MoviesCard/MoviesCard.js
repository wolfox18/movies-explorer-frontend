import React from "react";
import "./MoviesCard.css";
import { durationToString } from "../../../utils/utils";

function MoviesCard({ card, onCardButtonClick, isSaved }) {
  let likeClass;

  if (card.isLiked) {
    likeClass = "card__like transparent-link card__like_liked";
  } else {
    likeClass = "card__like transparent-link";
  }
  if (isSaved) {
    likeClass = "card__like transparent-link card__like_saved";
  }
  const handleCardButtonClick = () =>
  {
    onCardButtonClick(card);
  }

  return (
    <li className="card">
      <a
        href={card.trailerLink}
        className="card__link transparent-link"
        target="_blank"
        rel="noreferrer"
      >
        <img src={card.image} alt={card.nameRU} className="card__image" />
      </a>{" "}
      <div className="card__info">
        <h3 className="card__name">{card.nameRU}</h3>
        <button onClick={handleCardButtonClick} className={likeClass} />
      </div>
      <p className="card__duration">{durationToString(card.duration)}</p>
    </li>
  );
}

export default MoviesCard;

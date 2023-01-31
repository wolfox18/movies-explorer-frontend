import React from "react";
import "./MoviesCard.css";
import { durationToString } from "../../../utils/utils";

function MoviesCard({ card, onLikeClick }) {
  let likeClass;

  if (card.isLiked) {
    likeClass = "card__like transparent-link card__like_liked";
  } else {
    likeClass = "card__like transparent-link";
  }
  if (card.isSaved) {
    likeClass = "card__like transparent-link card__like_saved";
  }
  const handleLikeClick = () =>
  {
    onLikeClick(card);
  }

  return (
    <li className="card">
      <a
        href={card.trailerLink}
        className="card__link transparent-link"
        target="_blank"
        rel="noreferrer"
      >
        <img src={"https://api.nomoreparties.co/" + card.image.url} alt={card.nameRU} className="card__image" />
      </a>{" "}
      <div className="card__info">
        <h3 className="card__name">{card.nameRU}</h3>
        <button onClick={handleLikeClick} className={likeClass} />
      </div>
      <p className="card__duration">{durationToString(card.duration)}</p>
    </li>
  );
}

export default MoviesCard;

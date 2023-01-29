import React from "react";
import "./MoviesCard.css";

function MoviesCard({ imagePath, name, isLiked, duration, isSaved, url }) {
  let likeClass;

  if (isLiked) {
    likeClass = "card__like transparent-link card__like_liked";
  } else {
    likeClass = "card__like transparent-link";
  }
  if (isSaved) {
    likeClass = "card__like transparent-link card__like_saved";
  }

  return (
    <li className="card">
      <a
        href={url}
        className="card__link transparent-link"
        target="_blank"
        rel="noreferrer"
      >
        <img src={imagePath} alt={name} className="card__image" />
      </a>{" "}
      <div className="card__info">
        <h3 className="card__name">{name}</h3>
        <button className={likeClass} />
      </div>
      <p className="card__duration">{duration}</p>
    </li>
  );
}

export default MoviesCard;

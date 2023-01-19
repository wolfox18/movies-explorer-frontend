import React from "react";
import "./MoviesCard.css";

function MoviesCard({ imagePath, name, isLiked, duration }) {
  return (
    <li className="card">
      <a
        href="https://youtube.com"
        className="card__link transparent-link"
        target="_blank"
        rel="noreferrer"
      >
        <img src={imagePath} alt={name} className="card__image" />
      </a>{" "}
      <div className="card__info">
        <h3 className="card__name">{name}</h3>
        <button className={`card__like transparent-link ${isLiked ? "card__like_liked" : ""}`} />
      </div>
      <p className="card__duration">{duration}</p>
    </li>
  );
}

export default MoviesCard;

import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { durationToString } from "../../../utils/utils";

function MoviesCardList({
  isSaved,
  onMoreClick,
  isMoreVisible,
  isNothingFound,
  isError,
  cards,
}) {
  // console.log(cards[0].image.url);
  return (
    <section aria-label="Фильмы" className="cardlist">
      <ul className="cardlist__container">
        {cards.map((movie) => (
          <MoviesCard
            imagePath={"https://api.nomoreparties.co/" + movie.image.url}
            name={movie.nameRU}
            isLiked={false}
            duration={durationToString(movie.duration)}
            isSaved={isSaved}
            url={movie.trailerLink}
          />
        ))}
        {isNothingFound ? (
          <li className="cardlist__alert">Ничего не найдено</li>
        ) : (
          <></>
        )}
        {isError ? (
          <li className="cardlist__alert">
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз
          </li>
        ) : (
          <></>
        )}
      </ul>
      {isMoreVisible ? (
        <div className="cardlist__more-container">
          <button
            onClick={onMoreClick}
            className="cardlist__more-button transparent-link"
          >
            Ещё
          </button>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}

export default MoviesCardList;

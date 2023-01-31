import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  isSaved,
  onMoreClick,
  isMoreVisible,
  isNothingFound,
  isError,
  onLikeClick,
  cards,
}) {
  // console.log(cards[0].image.url);

  return (
    <section aria-label="Фильмы" className="cardlist">
      <ul className="cardlist__container">
        {cards.map((card) => (
          <MoviesCard
            key={card.id}
            card={card}
            onLikeClick={onLikeClick}
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

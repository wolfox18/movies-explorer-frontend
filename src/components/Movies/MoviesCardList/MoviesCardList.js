import React from "react";
import "./MoviesCardList.css";
import cardImagePath1 from "../../../images/movie-example-1.jpg";
import cardImagePath2 from "../../../images/movie-example-2.jpg";
import cardImagePath3 from "../../../images/movie-example-3.jpg";
import cardImagePath4 from "../../../images/movie-example-4.jpg";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList ({isSaved}) {
  return(
    <section aria-label="Фильмы" className="cardlist">
      <ul className="cardlist__container">
        <MoviesCard imagePath={cardImagePath1} name="33 слова о дизайне" isLiked={true} duration="1ч 47м" isSaved={isSaved}/>
        <MoviesCard imagePath={cardImagePath2} name="Киноальманах «100 лет дизайна»" isLiked={false} duration="1ч 3м" isSaved={isSaved}/>
        <MoviesCard imagePath={cardImagePath3} name="В погоне за Бенкси" isLiked={true} duration="1ч 21м" isSaved={isSaved}/>
        <MoviesCard imagePath={cardImagePath4} name="Баския: Взрыв реальности" isLiked={true} duration="1ч 44м" isSaved={isSaved}/>
      </ul>
      <div className="cardlist__more-container">
        <button className="cardlist__more-button transparent-link">Ещё</button>
      </div>
    </section>
  )
}

export default MoviesCardList;
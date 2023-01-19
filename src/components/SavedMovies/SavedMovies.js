import React from "react";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies({
  isNavTabOpened,
  onCloseNavTab,
  onBurgerClick,
}) {
  return (
    <>
      <Header isLoggedIn={true} onBurgerClick={onBurgerClick} />
      <MoviesCardList />
      <Navigation isOpened={isNavTabOpened} onCloseNavTab={onCloseNavTab} />
      <Footer />
    </>
  );
}

export default SavedMovies;

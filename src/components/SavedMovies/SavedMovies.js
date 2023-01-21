import React from "react";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies({ isNavTabOpened, onCloseNavTab, onBurgerClick }) {
  return (
    <>
      <Header isLoggedIn={true} onBurgerClick={onBurgerClick} />
      <main>
        <SearchForm />
        <MoviesCardList isSaved={true} />
        <Navigation isOpened={isNavTabOpened} onCloseNavTab={onCloseNavTab} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;

import React from "react";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies(props) {
  const {
    isLoaded,
    isNavTabOpened,
    onCloseNavTab,
    onBurgerClick,
    onSearch,
    isShortsChecked,
    onShortsCheckboxClick,
    cards,
  } = props;
  return (
    <>
      <Header isLoggedIn={true} onBurgerClick={onBurgerClick} />
      <main>
        <SearchForm
          onSearch={onSearch}
          isShortsChecked={isShortsChecked}
          onShortsCheckboxClick={onShortsCheckboxClick}
        />
        <MoviesCardList isSaved={true} cards={cards} />
        <Navigation isOpened={isNavTabOpened} onCloseNavTab={onCloseNavTab} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;

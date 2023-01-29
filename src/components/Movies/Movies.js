import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies(props) {
  const {
    isLoaded,
    isNavTabOpened,
    onCloseNavTab,
    onBurgerClick,
    onSearch,
    searchKey,
    isShortsChecked,
    onShortsCheckboxClick,
    onSearchInputChange,
    onMoreClick,
    isMoreVisible,
    isNothingFound,
    isError,
    cards,
  } = props;
  return (
    <>
      <Header isLoggedIn={true} onBurgerClick={onBurgerClick} />
      <main>
        <SearchForm
          onSearch={onSearch}
          searchKey={searchKey}
          isShortsChecked={isShortsChecked}
          onShortsCheckboxClick={onShortsCheckboxClick}
          onSearchInputChange={onSearchInputChange}
        />
        {isLoaded ? (
          <>
            <MoviesCardList
              isSaved={false}
              onMoreClick={onMoreClick}
              isMoreVisible={isMoreVisible}
              isNothingFound={isNothingFound}
              isError={isError}
              cards={cards}
            />
          </>
        ) : (
          <Preloader />
        )}
        <Navigation isOpened={isNavTabOpened} onCloseNavTab={onCloseNavTab} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;

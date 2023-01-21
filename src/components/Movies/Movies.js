import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies({ isLoaded, isNavTabOpened, onCloseNavTab, onBurgerClick }) {
  return (
    <>
      <Header isLoggedIn={true} onBurgerClick={onBurgerClick} />
      <main>
        <SearchForm />
        {isLoaded ? (
          <>
            <MoviesCardList isSaved={false} />
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

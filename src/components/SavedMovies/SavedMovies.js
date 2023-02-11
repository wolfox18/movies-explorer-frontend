import React from "react";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Movies/Preloader/Preloader";
import { mainApi } from "../../utils/MainApi";
import { filterMovies } from "../../utils/utils";

function SavedMovies(props) {
  const { isNavTabOpened, onCloseNavTab, onBurgerClick } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const [savedCards, setSavedCards] = React.useState([]);
  const [cardsToShow, setCardsToShow] = React.useState([]);
  const [isShortsChecked, setIsShortsChecked] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState("");
  const [isMainApiError, setIsMainApiError] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    mainApi
      .getMovies()
      .then((savedMovies) => {
        setSavedCards(savedMovies);
        setCardsToShow(savedMovies);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Ошбика при загрузке сохраненных фильмов - ", err);
        setIsMainApiError(true);
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    setCardsToShow(filterMovies(savedCards, searchKey, isShortsChecked));
  }, [isShortsChecked, savedCards]);

  const handleShortsCheckboxClick = () => {
    setIsShortsChecked(!isShortsChecked);
  };

  const handleSearchInputChange = (e) => {
    setSearchKey(e.target.value);
  };

  const handleSearch = () => {
    setCardsToShow(filterMovies(savedCards, searchKey, isShortsChecked));
  };

  const handleCardDelete = (currentCard) => {
    mainApi
      .deleteMovie({ movieId: currentCard._id })
      .then(() => {
        setSavedCards((cards) =>
          cards.filter((movie) => movie.movieId !== currentCard.movieId)
        );
        const newAllMovies = JSON.parse(localStorage.getItem("allMovies"))
        newAllMovies.forEach(movie => {
          if (movie.movieId === currentCard.movieId) {movie.isLiked = false}
        });
        localStorage.setItem("allMovies", JSON.stringify(newAllMovies));
        const newFilteredMovies = JSON.parse(localStorage.getItem("filteredMovies"));
        newFilteredMovies.forEach(movie => {
          if (movie.movieId === currentCard.movieId) {movie.isLiked = false}
        });
        localStorage.setItem("filteredMovies", JSON.stringify(newFilteredMovies));
      })
      .catch((err) => {
        console.log("Ошибка при удалении карточки: ", err);
      });
  };

  return (
    <>
      <Header isLoggedIn={true} onBurgerClick={onBurgerClick} />
      <main>
        <SearchForm
          onSearch={handleSearch}
          searchKey={searchKey}
          isShortsChecked={isShortsChecked}
          onShortsCheckboxClick={handleShortsCheckboxClick}
          onSearchInputChange={handleSearchInputChange}
        />
        {!isLoading ? (
          <>
            <MoviesCardList
              isSaved={true}
              isMoreVisible={false}
              isNothingFound={false}
              isError={isMainApiError}
              onCardButtonClick={handleCardDelete}
              cards={cardsToShow}
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

export default SavedMovies;

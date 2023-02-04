import React from "react";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Movies/Preloader/Preloader";
import { mainApi } from "../../utils/MainApi";
import { filterMovies } from "../../utils/utils";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedMovies(props) {
  const { isNavTabOpened, onCloseNavTab, onBurgerClick } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const [savedCards, setSavedCards] = React.useState([]);
  const [cardsToShow, setCardsToShow] = React.useState([]);
  const [isShortsChecked, setIsShortsChecked] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState("");
  const [isMainApiError, setIsMainApiError] = React.useState(false);

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setIsLoading(true);
    mainApi
      .getMovies()
      .then((savedMovies) => {
        const movies = savedMovies.filter(
          (savedMovie) => savedMovie.owner.email === currentUser.email
        );
        setSavedCards(movies);
        setCardsToShow(movies);
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

  const handleSearch = (e) => {
    e.preventDefault();
    setCardsToShow(filterMovies(savedCards, searchKey, isShortsChecked));
  };

  const handleCardDelete = (card) => {
    mainApi
      .deleteMovie({ movieId: card._id })
      .then((res) => {
        setSavedCards((cards) =>
          cards.filter((oldCard) => oldCard.movieId !== card.movieId)
        );
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

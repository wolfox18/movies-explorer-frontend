import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { movieApi } from "../../utils/MovieApi";
import { filterMovies, howManyShow, howManyAdd } from "../../utils/utils.js";

function Movies({ isNavTabOpened, onCloseNavTab, onBurgerClick }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isBeatFilmsLoaded, setIsBeatFilmsLoaded] = React.useState(false);
  const [filteredCards, setFilteredCards] = React.useState([]);
  const [cardsToShowCounter, setCardsToShowCounter] = React.useState([]);
  const [isShortsChecked, setIsShortsChecked] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState("");
  const [isMoreVisible, setIsMoreVisible] = React.useState(false);
  const [isNothingFound, setIsNothingFound] = React.useState(false);
  const [isBeatFilmError, setIsBeatFilmError] = React.useState(false);

  React.useEffect(() => {
    if (filteredCards.length > cardsToShowCounter) {
      setIsMoreVisible(true);
    } else {
      setIsMoreVisible(false);
    }
  }, [cardsToShowCounter, filteredCards]);

  React.useEffect(() => {
    if (isBeatFilmsLoaded && filteredCards.length === 0) {
      setIsNothingFound(true);
    } else {
      setIsNothingFound(false);
    }
  }, [filteredCards, isBeatFilmsLoaded]);
  React.useEffect(() => {
    if (localStorage.getItem("searchParams")) {
      setSearchKey(JSON.parse(localStorage.getItem("searchParams")).key);
      setIsShortsChecked(
        JSON.parse(localStorage.getItem("searchParams")).isShorts
      );
    }
  }, []);

  React.useEffect(() => {
    if (isBeatFilmsLoaded) {
      showMovies();
    }
  }, [isShortsChecked])

  const handleShortsCheckboxClick = () => {
    setIsShortsChecked(!isShortsChecked);
  };

  const showMovies = () => {
    setCardsToShowCounter(howManyShow());
    // console.log(cardsToShowCounter);
    setFilteredCards(
      filterMovies(
        JSON.parse(localStorage.getItem("allMovies")),
        searchKey,
        isShortsChecked
      )
    );
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    localStorage.setItem(
      "searchParams",
      JSON.stringify({
        key: searchKey,
        isShorts: isShortsChecked,
      })
    );
    if (!isBeatFilmsLoaded) {
      movieApi
        .getMovies()
        .then((res) => {
          setIsBeatFilmError(false);
          localStorage.setItem("allMovies", JSON.stringify(res));
          setIsBeatFilmsLoaded(true);
          showMovies();
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("Ошибка при запросе к BeatFilms: ", err);
          setIsBeatFilmError(true);
          setIsLoading(false);
        });
    } else {
      showMovies();
      setIsLoading(false);
    }
  };
  const handleMore = () => {
    setCardsToShowCounter(cardsToShowCounter + howManyAdd());
  };
  const handleSearchInputChange = (e) => {
    setSearchKey(e.target.value);
  };
  const handleCardLike = (card) => {
    card.isLiked = !card.isLiked;
    setFilteredCards((cards) =>
      cards.map((oldCard) => (oldCard.id === card.id ? card : oldCard))
    );
  };
  // console.log(cardsToShowCounter);
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
              isSaved={false}
              onMoreClick={handleMore}
              isMoreVisible={isMoreVisible}
              isNothingFound={isNothingFound}
              isError={isBeatFilmError}
              onLikeClick={handleCardLike}
              cards={filteredCards.slice(0, cardsToShowCounter)}
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

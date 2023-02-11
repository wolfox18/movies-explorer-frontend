import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { movieApi } from "../../utils/MovieApi";
import { filterMovies, howManyShow, howManyAdd } from "../../utils/utils.js";
import { mainApi } from "../../utils/MainApi";

function Movies({ isNavTabOpened, onCloseNavTab, onBurgerClick }) {
  const localBeatFilmMovies =
    JSON.parse(localStorage.getItem("allMovies")) || [];
  const localSortedMovies =
    JSON.parse(localStorage.getItem("sortedMovies")) || [];
  const localFilterParams = JSON.parse(
    localStorage.getItem("filterParams")
  ) || { isShorts: false, key: "" };

  const [isLoading, setIsLoading] = React.useState(false);
  const [isNothingFound, setIsNothingFound] = React.useState(false);
  const [isMoreVisible, setIsMoreVisible] = React.useState(false);
  const [cardsToShowCounter, setCardsToShowCounter] = React.useState(0);
  const [isBeatFilmError, setIsBeatFilmError] = React.useState(false);

  const [isBeatFilmsLoaded, setIsBeatFilmsLoaded] = React.useState(
    !!localBeatFilmMovies.length
  );
  const [filteredMovies, setFilteredMovies] = React.useState(localSortedMovies);
  const [filterParams, setFilterParams] = React.useState(localFilterParams);

  React.useEffect(() => {
    if (filteredMovies.length > cardsToShowCounter) {
      setIsMoreVisible(true);
    } else {
      setIsMoreVisible(false);
    }
  }, [cardsToShowCounter, filteredMovies]);

  React.useEffect(() => {
    if (isBeatFilmsLoaded && filteredMovies.length === 0) {
      setIsNothingFound(true);
    } else {
      setIsNothingFound(false);
    }
  }, [filteredMovies, isBeatFilmsLoaded]);

  React.useEffect(() => {
    if (isBeatFilmsLoaded) {
      searchMovies();
    }
  }, [filterParams.isShorts]);

  const searchMovies = () => {
    setCardsToShowCounter(howManyShow());
    const filteredMovies = filterMovies(
      JSON.parse(localStorage.getItem("allMovies")),
      filterParams.key,
      filterParams.isShorts
    );
    setFilteredMovies(filteredMovies);
    localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    localStorage.setItem(
      "filterParams",
      JSON.stringify({
        isShorts: filterParams.isShorts,
        key: filterParams.key,
      })
    );
  };

  const handleSearch = () => {
    setIsLoading(true);

    if (!isBeatFilmsLoaded) {
      movieApi
        .getMovies()
        .then((beatFilmMovies) => {
          setIsBeatFilmError(false);
          mainApi
            .getMovies()
            .then((savedMovies) => {
              const allMovies = beatFilmMovies.map((beatFilmMovie) => {
                let isLiked = false;
                let hexId = "";
                savedMovies.forEach((savedMovie) => {
                  if (savedMovie.movieId === beatFilmMovie.id) {
                    isLiked = true;
                    hexId = savedMovie._id;
                  }
                });
                return {
                  country: beatFilmMovie.country,
                  director: beatFilmMovie.director,
                  duration: beatFilmMovie.duration,
                  year: beatFilmMovie.year,
                  description: beatFilmMovie.description,
                  image:
                    "https://api.nomoreparties.co/" + beatFilmMovie.image.url,
                  trailerLink: beatFilmMovie.trailerLink,
                  thumbnail:
                    "https://api.nomoreparties.co/" +
                    beatFilmMovie.image.formats.thumbnail.url,
                  movieId: beatFilmMovie.id,
                  nameRU: beatFilmMovie.nameRU,
                  nameEN: beatFilmMovie.nameEN,
                  isLiked: isLiked,
                  hexId: hexId,
                };
              });
              localStorage.setItem("allMovies", JSON.stringify(allMovies));
              setIsBeatFilmsLoaded(true);
              searchMovies();
            })
            .catch((err) => {
              console.log("Ошибка при загрузке сохраненных фильмов - ", err);
            });
        })
        .catch((err) => {
          console.log("Ошибка при запросе к BeatFilms: ", err);
          setIsBeatFilmError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      searchMovies();
      setIsLoading(false);
    }
  };
  const handleMore = () => {
    setCardsToShowCounter(cardsToShowCounter + howManyAdd());
  };

  const handleShortsCheckboxClick = () => {
    setFilterParams({ ...filterParams, isShorts: !filterParams.isShorts });
  };
  const handleSearchInputChange = (e) => {
    setFilterParams({ ...filterParams, key: e.target.value });
  };

  const changeMoviesAfterLike = (newCard) => {
    const newFilteredMovies = filteredMovies.map((oldCard) =>
      oldCard.movieId === newCard.movieId ? newCard : oldCard
    );
    setFilteredMovies(newFilteredMovies);
    localStorage.setItem("filteredMovies", JSON.stringify(newFilteredMovies));
    const newAllCards = JSON.parse(localStorage.getItem("allMovies")).map(
      (oldCard) => (oldCard.movieId === newCard.movieId ? newCard : oldCard)
    );
    localStorage.setItem("allMovies", JSON.stringify(newAllCards));
  };

  const handleCardLike = (card) => {
    if (card.isLiked) {
      mainApi
        .deleteMovie({ movieId: card.hexId })
        .then(() => {
          card.isLiked = false;
          changeMoviesAfterLike(card);
        })
        .catch((err) => {
          console.log("Ошибка! Карточка не удалена из понравившихся - ", err);
        });
    } else {
      mainApi
        .addMovie(card)
        .then((savedCard) => {
          card.hexId = savedCard._id;
          card.isLiked = true;
          changeMoviesAfterLike(card);
        })
        .catch((err) => {
          console.log("Ошбика при добавлении карточки в понравившиеся - ", err);
        });
    }
  };
  return (
    <>
      <Header isLoggedIn={true} onBurgerClick={onBurgerClick} />
      <main>
        <SearchForm
          onSearch={handleSearch}
          searchKey={filterParams.key}
          isShortsChecked={filterParams.isShorts}
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
              onCardButtonClick={handleCardLike}
              cards={filteredMovies.slice(0, cardsToShowCounter)}
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

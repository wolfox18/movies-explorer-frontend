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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Movies({ isNavTabOpened, onCloseNavTab, onBurgerClick }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isBeatFilmsLoaded, setIsBeatFilmsLoaded] = React.useState(false);
  const [filteredCards, setFilteredCards] = React.useState([]);
  const [cardsToShowCounter, setCardsToShowCounter] = React.useState(0);
  const [isShortsChecked, setIsShortsChecked] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState("");
  const [isMoreVisible, setIsMoreVisible] = React.useState(false);
  const [isNothingFound, setIsNothingFound] = React.useState(false);
  const [isBeatFilmError, setIsBeatFilmError] = React.useState(false);

  const currentUser = React.useContext(CurrentUserContext);

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
    if (localStorage.getItem("searchParams")) {
      setCardsToShowCounter(howManyShow());
      setFilteredCards(JSON.parse(localStorage.getItem("filteredMovies")));
    }
  }, []);

  React.useEffect(() => {
    if (isBeatFilmsLoaded) {
      showMovies();
    }
  }, [isShortsChecked]);

  const handleShortsCheckboxClick = () => {
    setIsShortsChecked(!isShortsChecked);
  };

  const showMovies = () => {
    setCardsToShowCounter(howManyShow());
    const filteredMovies = filterMovies(
      JSON.parse(localStorage.getItem("allMovies")),
      searchKey,
      isShortsChecked
    );
    setFilteredCards(filteredMovies);
    localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
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
          mainApi
            .getMovies()
            .then((savedMovies) => {
              const allMovies = res.map((movie) => {
                const usersLikedMovies = savedMovies.filter(
                  (someMovie) => someMovie.owner.email === currentUser.email
                );
                let isLiked = false;
                let hexId = "";
                usersLikedMovies.forEach((likedMovie) => {
                  if (likedMovie.movieId === movie.id) {
                    isLiked = true;
                    hexId = likedMovie._id;
                  }
                });

                return {
                  country: movie.country,
                  director: movie.director,
                  duration: movie.duration,
                  year: movie.year,
                  description: movie.description,
                  image: "https://api.nomoreparties.co/" + movie.image.url,
                  trailerLink: movie.trailerLink,
                  thumbnail:
                    "https://api.nomoreparties.co/" +
                    movie.image.formats.thumbnail.url,
                  movieId: movie.id,
                  nameRU: movie.nameRU,
                  nameEN: movie.nameEN,
                  isLiked: isLiked,
                  hexId: hexId,
                };
              });
              localStorage.setItem("allMovies", JSON.stringify(allMovies));
              setIsBeatFilmsLoaded(true);
              showMovies();
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
  const renderAfterLike = ({card}) => {
    const cards = filteredCards.map((oldCard) => oldCard.movieId === card.movieId ? card : oldCard);
    setFilteredCards(cards);
    localStorage.setItem("filteredMovies", JSON.stringify(cards));
  }
  const handleCardLike = (card) => {
    if (card.isLiked) {
      mainApi
        .deleteMovie({ movieId: card.hexId })
        .then(() => {
          card.isLiked = false;
          renderAfterLike({card, isLiked: false})
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
          renderAfterLike({card, isLiked: true})
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
              onCardButtonClick={handleCardLike}
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

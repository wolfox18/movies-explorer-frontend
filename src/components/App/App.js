import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import { movieApi } from "../../utils/MovieApi";
import { filterMovies, howManyShow, howManyAdd } from "../../utils/utils.js";

function App() {
  const [isNavTabOpened, setIsNavTabOpened] = React.useState(false);
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
    setSearchKey(JSON.parse(localStorage.getItem("searchParams")).key);
    setIsShortsChecked(JSON.parse(localStorage.getItem("searchParams")).isShorts);
  }, [])

  const handleShortsCheckboxClick = () => {
    setIsShortsChecked(!isShortsChecked);
  };

  const handleNavTabOpen = () => {
    setIsNavTabOpened(true);
  };
  const handleCloseNavTab = () => {
    setIsNavTabOpened(false);
  };
  const isLoggedIn = 1;

  const showMovies = (key) => {
    setCardsToShowCounter(howManyShow());
    // console.log(cardsToShowCounter);
    setFilteredCards(
      filterMovies(
        JSON.parse(localStorage.getItem("allMovies")),
        key,
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
          showMovies(searchKey);
          setIsLoading(false);
        })
        .catch(() => {
          setIsBeatFilmError(true);
          setIsLoading(false);
        });
    } else {
      showMovies(searchKey);
      setIsLoading(false);
    }
  };
  const handleMore = () => {
    setCardsToShowCounter(cardsToShowCounter + howManyAdd());
  };
  const handleSearchInputChange = (e) => {
    setSearchKey(e.target.value);
  };
  // console.log(cardsToShowCounter);
  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <Main
              isNavTabOpened={isNavTabOpened}
              onCloseNavTab={handleCloseNavTab}
              isLoggedIn={isLoggedIn}
              onBurgerClick={handleNavTabOpen}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <Movies
              isLoaded={!isLoading}
              isNavTabOpened={isNavTabOpened}
              onCloseNavTab={handleCloseNavTab}
              onBurgerClick={handleNavTabOpen}
              onSearch={handleSearch}
              searchKey={searchKey}
              isShortsChecked={isShortsChecked}
              onShortsCheckboxClick={handleShortsCheckboxClick}
              onSearchInputChange={handleSearchInputChange}
              onMoreClick={handleMore}
              isMoreVisible={isMoreVisible}
              isNothingFound={isNothingFound}
              isError={isBeatFilmError}
              cards={filteredCards.slice(0, cardsToShowCounter)}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <SavedMovies
              isNavTabOpened={isNavTabOpened}
              onCloseNavTab={handleCloseNavTab}
              onBurgerClick={handleNavTabOpen}
              onSearch={handleSearch}
              isShortsChecked={isShortsChecked}
              onShortsCheckboxClick={handleShortsCheckboxClick}
              cards={[]}
            />
          }
        />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route
          path="/profile"
          element={
            <Profile
              onBurgerClick={handleNavTabOpen}
              isNavTabOpened={isNavTabOpened}
              onCloseNavTab={handleCloseNavTab}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

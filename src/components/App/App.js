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

function App() {
  const [isNavTabOpened, setIsNavTabOpened] = React.useState(false);

  const handleNavTabOpen = () => {
    setIsNavTabOpened(true);
  };
  const handleCloseNavTab = () => {
    setIsNavTabOpened(false);
  };
  const isLoggedIn = 1;
  const isLoaded = 1;
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
              isLoaded={isLoaded}
              isNavTabOpened={isNavTabOpened}
              onCloseNavTab={handleCloseNavTab}
              onBurgerClick={handleNavTabOpen}
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

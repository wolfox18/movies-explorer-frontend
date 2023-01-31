import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import { mainApi } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isNavTabOpened, setIsNavTabOpened] = React.useState(false);
  const [apiErrorText, setApiErrorText] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [succesMessage, setSuccesMessage] = React.useState("");

  const navigate = useNavigate();

  const handleNavTabOpen = () => {
    setIsNavTabOpened(true);
  };
  const handleCloseNavTab = () => {
    setIsNavTabOpened(false);
  };
  const login = (credentials) => {
    mainApi
      .authorise(credentials.email, credentials.password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        mainApi
          .getMe()
          .then((res) => {
            setCurrentUser({ name: res.name, email: res.email });
            console.log(currentUser);
            navigate("/movies");
          })
          .catch((err) => {
            setApiErrorText(
              "При получении данных пользователя произошла ошибка"
            );
          });
      })
      .catch((err) => {
        setApiErrorText("При авторизации пользователя произошла ошибка");
      });
  };
  const handleLogin = (inputs) => {
    login(inputs);
  };
  const handleRegister = (inputs) => {
    const { name, email, password } = inputs;
    mainApi
      .register(name, email, password)
      .then((res) => {
        login(inputs);
      })
      .catch((err) => {
        if (err.message === 409) {
          setApiErrorText("Пользователь с таким e-mail уже существует!");
        } else {
          setApiErrorText("При регистрации пользователя произошла ошибка");
        }
      });
  };
  const clearResponceErrorText = () => {
    setApiErrorText("");
  };
  const handleProfileChange = (data) => {
    mainApi
      .patchMe(data)
      .then((res) => {
        setCurrentUser(data);
        clearResponceErrorText();
        setSuccesMessage("Данные успешно изменены");
      })
      .catch((err) => {
        setApiErrorText("При обновлении данных пользователя произошла ошибка");
      });
  };
  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
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
          <Route
            path="/signup"
            element={
              <Register
                onSubmit={handleRegister}
                responceErrorText={apiErrorText}
                clearResponceErrorText={clearResponceErrorText}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onSubmit={handleLogin}
                responceErrorText={apiErrorText}
                clearResponceErrorText={clearResponceErrorText}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                onBurgerClick={handleNavTabOpen}
                isNavTabOpened={isNavTabOpened}
                onCloseNavTab={handleCloseNavTab}
                onSubmit={handleProfileChange}
                clearResponceErrorText={clearResponceErrorText}
                responceErrorText={apiErrorText}
                onLogOut={handleLogOut}
                succesMessage={succesMessage}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

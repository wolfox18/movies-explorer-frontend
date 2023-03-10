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
import { ProtectedRoute, OnlyForUnregistredUsersRoute } from "./ProtectedRoute";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isNavTabOpened, setIsNavTabOpened] = React.useState(false);
  const [apiErrorText, setApiErrorText] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [succesMessage, setSuccesMessage] = React.useState("");

  React.useEffect(() => {
    checkToken();
  }, []);

  const navigate = useNavigate();

  const handleNavTabOpen = () => {
    setIsNavTabOpened(true);
  };
  const handleCloseNavTab = () => {
    setIsNavTabOpened(false);
  };

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setIsLoggedIn(false);
      navigate("/");
    } else {
      mainApi
        .getMe()
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log("Ошибка при проверке токена: ", err);
          setIsLoggedIn(false);
          navigate("/");
        });
    }
  };
  const login = (credentials, setFormActive) => {
    mainApi
      .authorise(credentials.email, credentials.password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        mainApi
          .getMe()
          .then((res) => {
            setCurrentUser({ name: res.name, email: res.email });
            setFormActive();
            navigate("/movies");
          })
          .catch((err) => {
            setApiErrorText(
              "При получении данных пользователя произошла ошибка"
            );
            setFormActive();
          });
      })
      .catch((err) => {
        setApiErrorText("При авторизации пользователя произошла ошибка");
        setFormActive();
      });
  };
  const handleLogin = (inputs, setFormActive) => {
    login(inputs, setFormActive);
  };
  const handleRegister = (inputs, setFormActive) => {
    const { name, email, password } = inputs;
    mainApi
      .register(name, email, password)
      .then((res) => {
        login(inputs, setFormActive);
      })
      .catch((err) => {
        if (err.message === "409") {
          setApiErrorText("Пользователь с таким e-mail уже существует!");
        } else {
          setApiErrorText("При регистрации пользователя произошла ошибка");
        }
      });
  };
  const clearResponceErrorText = () => {
    setApiErrorText("");
  };
  const handleProfileChange = (data, setFormActive) => {
    mainApi
      .patchMe(data)
      .then((res) => {
        setCurrentUser(data);
        clearResponceErrorText();
        setSuccesMessage("Данные успешно изменены");
        setFormActive();
      })
      .catch((err) => {
        setApiErrorText("При обновлении данных пользователя произошла ошибка");
        setFormActive();
      });
  };
  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("searchParams");
    localStorage.removeItem("filteredMovies");
    setIsLoggedIn(false);
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
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Movies
                  isNavTabOpened={isNavTabOpened}
                  onCloseNavTab={handleCloseNavTab}
                  onBurgerClick={handleNavTabOpen}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <SavedMovies
                  isNavTabOpened={isNavTabOpened}
                  onCloseNavTab={handleCloseNavTab}
                  onBurgerClick={handleNavTabOpen}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <OnlyForUnregistredUsersRoute loggedIn={isLoggedIn}>
                <Register
                  onSubmit={handleRegister}
                  responceErrorText={apiErrorText}
                  clearResponceErrorText={clearResponceErrorText}
                />
              </OnlyForUnregistredUsersRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <OnlyForUnregistredUsersRoute loggedIn={isLoggedIn}>
                <Login
                  onSubmit={handleLogin}
                  responceErrorText={apiErrorText}
                  clearResponceErrorText={clearResponceErrorText}
                />
              </OnlyForUnregistredUsersRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
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
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

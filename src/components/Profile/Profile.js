import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import "../Register/Register.css";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({
  onBurgerClick,
  isNavTabOpened,
  onCloseNavTab,
  onSubmit,
  clearResponceErrorText,
  responceErrorText,
  onLogOut,
  succesMessage,
}) {
  const [inputs, setInputs] = React.useState({
    name: "",
    email: ""
  });
  const [isInputsValid, setIsInputsValid] = React.useState({
    name: true,
    email: true,
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isInputsActive, setIsInputsActive] = React.useState(true);
  const [isSubmitActive, setIsSubmitActive] = React.useState(false);

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setInputs({ name: currentUser.name, email: currentUser.email });
  }, []);

  React.useEffect(() => {
    if (inputs.name === currentUser.name && inputs.email === currentUser.email) {
      setIsSubmitActive(false);
    }
    else {
      setIsSubmitActive(true);
    }
  }, [inputs])

  const validateField = (field, value) => {
    switch (field) {
      case "email":
        if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)) {
          setIsInputsValid({ ...isInputsValid, email: false });
          setErrorMessage("Ошибка в почте");
          setIsSubmitActive(false);
        } else {
          setIsInputsValid({ ...isInputsValid, email: true });
          setErrorMessage("");
          setIsSubmitActive(true);
        }
        break;
      case "name":
        if (!value.match(/^[ \-a-zA-ZА-Яа-я]+$/)) {
          setIsInputsValid({ ...isInputsValid, name: false });
          setErrorMessage(
            "В имени можно использовать только латиницу, кириллицу, пробел или дефис"
          );
          setIsSubmitActive(false);
        } else {
          setIsInputsValid({ ...isInputsValid, name: true });
          setErrorMessage("");
          setIsSubmitActive(true);
        }
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e) => {
    clearResponceErrorText();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsInputsActive(false);
    setIsSubmitActive(false);
    onSubmit(inputs, () => {
      setIsInputsActive(true);
    });

  };

  return (
    <>
      <Header isLoggedIn={true} onBurgerClick={onBurgerClick} />
      <main className="profile">
        <div className="profile__container">
          <h1 className="profile__title">Привет, {currentUser.name}</h1>
          <form className="profile__form" onSubmit={handleSubmit}>
            <ul className="profile__fields">
              <li className="profile__input-layout">
                <label className="profile__label" htmlFor="name">
                  Имя
                </label>
                <input
                  className="profile__input"
                  name="name"
                  autoComplete="name"
                  value={inputs.name}
                  onChange={handleInputChange}
                  disabled={isInputsActive ? false : true}
                  required
                />
              </li>

              <li className="profile__input-layout">
                <label className="profile__label" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="profile__input"
                  name="email"
                  autoComplete="username"
                  value={inputs.email}
                  onChange={handleInputChange}
                  disabled={isInputsActive ? false : true}
                  required
                />
              </li>
            </ul>
            <span className="profile__error">
              {errorMessage || responceErrorText}
            </span>
            <span className="profile__message">{succesMessage}</span>
            <button
              className="profile__submit transparent-link"
              disabled={!isSubmitActive ? true : false}
            >
              Редактировать
            </button>
          </form>
          <button
            className="profile__submit profile__submit_type_colored transparent-link"
            onClick={onLogOut}
          >
            Выйти из аккаунта
          </button>
        </div>
        <Navigation isOpened={isNavTabOpened} onCloseNavTab={onCloseNavTab} />
      </main>
    </>
  );
}

export default Profile;

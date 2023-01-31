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
  const [inputs, setInputs] = React.useState({});
  const [isInputsValid, setIsInputsValid] = React.useState({
    name: true,
    email: true,
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isFormActive, setIsFormActive] = React.useState(true);

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setInputs({ name: currentUser.name, email: currentUser.email });
  }, []);

  const validateField = (field, value) => {
    switch (field) {
      case "email":
        if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)) {
          setIsInputsValid({ ...isInputsValid, email: false });
          setErrorMessage("Ошибка в почте");
        } else {
          setIsInputsValid({ ...isInputsValid, email: true });
          setErrorMessage("");
        }
        break;
      case "name":
        if (!value.match(/^[ \-a-zA-ZА-Яа-я]+$/)) {
          setIsInputsValid({ ...isInputsValid, name: false });
          setErrorMessage(
            "В имени можно использовать только латиницу, кириллицу, пробел или дефис"
          );
        } else {
          setIsInputsValid({ ...isInputsValid, name: true });
          setErrorMessage("");
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
    setIsFormActive(false);
    onSubmit(inputs);
  };

  return (
    <>
      <Header isLoggedIn={true} onBurgerClick={onBurgerClick} />
      <main className="profile">
        <div className="profile__container">
          <h1 className="profile__title">Привет, Username!</h1>
          <form className="profile__form" onSubmit={handleSubmit}>
            <ul className="profile__fields">
              <li className="profile__input-layout">
                <label className="profile__label" htmlFor="name">
                  Имя
                </label>
                <input
                  className="profile__input"
                  name="name"
                  value={inputs.name}
                  onChange={handleInputChange}
                  disabled={isFormActive ? false : true}
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
                  value={inputs.email}
                  onChange={handleInputChange}
                  disabled={isFormActive ? false : true}
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
              disabled={errorMessage || !isFormActive ? true : false}
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

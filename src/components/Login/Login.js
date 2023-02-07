import React from "react";
import "../Register/Register.css";
import { Link } from "react-router-dom";

function Login({ onSubmit, responceErrorText, clearResponceErrorText }) {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });
  const [isInputsValid, setIsInputsValid] = React.useState({
    email: false,
    password: false,
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isInputsActive, setIsInputsActive] = React.useState(true);
  const [isSubmitActive, setIsSubmitActive] = React.useState(false);

  React.useEffect(() => {
    if (isInputsValid.email && isInputsValid.password) {
      setIsSubmitActive(true);
    } else {
      setIsSubmitActive(false);
    }
  }, [inputs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsInputsActive(false);
    onSubmit(inputs, () => {
      setIsInputsActive(true);
    });
  };

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
      case "password":
        if (value.length < 1) {
          setIsInputsValid({ ...isInputsValid, password: false });
          setErrorMessage(
            "Пароль должен содержать, по крайней мере, 1 символ"
          );
        } else {
          setIsInputsValid({ ...isInputsValid, password: true });
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

  return (
    <main className="sign">
      <div className="sign__container">
        <Link to="/" className="sign__logo transparent-link" />
        <h1 className="sign__title">Рады видеть!</h1>
        <form className="sign__form" onSubmit={handleSubmit}>
          <label className="sing__label" htmlFor="email">
            E-mail
          </label>
          <input
            className={`sign__input ${
              isInputsValid.email ? "" : "sign__input_error"
            }`}
            name="email"
            placeholder="Ваша почта"
            type="email"
            autoComplete="username"
            required
            value={inputs.email}
            onChange={handleInputChange}
            disabled={isInputsActive ? false : true}
          />

          <label className="sing__label" htmlFor="password" type="password">
            Пароль
          </label>
          <input
            className={`sign__input ${
              isInputsValid.password ? "" : "sign__input_error"
            }`}
            name="password"
            placeholder=""
            type="password"
            autoComplete="new-password"
            required
            value={inputs.password}
            onChange={handleInputChange}
            disabled={isInputsActive ? false : true}
          />
          <span className="sign__error">
            {errorMessage || responceErrorText}
          </span>

          <button
            className="sign__submit transparent-link"
            disabled={(errorMessage || !isSubmitActive) ? true : false}
          >
            Войти
          </button>
          <p className="sign__text">
            Ещё не зарегистрированы?
            <Link to="/signup" className="sign__link transparent-link">
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;

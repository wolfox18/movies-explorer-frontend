import React from "react";
import "../Register/Register.css";

function Login({ onSubmit, responceErrorText, clearResponceErrorText }) {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });
  const [isInputsValid, setIsInputsValid] = React.useState({
    email: true,
    password: true,
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isFormActive, setIsFormActive] = React.useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormActive(false);
    onSubmit(inputs);
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
          console.log(value.length);
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
        <a href="/" className="sign__logo transparent-link" />
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
            required
            value={inputs.email}
            onChange={handleInputChange}
            disabled={isFormActive ? false : true}
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
            required
            value={inputs.password}
            onChange={handleInputChange}
            disabled={isFormActive ? false : true}
          />
          <span className="sign__error">
            {errorMessage || responceErrorText}
          </span>

          <button
            className="sign__submit transparent-link"
            disabled={(errorMessage || !isFormActive) ? true : false}
          >
            Войти
          </button>
          <p className="sign__text">
            Ещё не зарегистрированы?
            <a href="/signup" className="sign__link transparent-link">
              Регистрация
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;

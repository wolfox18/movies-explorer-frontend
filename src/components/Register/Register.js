import React from "react";
import "./Register.css";

function Register() {
  return (
    <main className="sign">
      <div className="sign__container">
        <a href="/" className="sign__logo transparent-link" />
        <h1 className="sign__title">Добро пожаловать</h1>
        <form className="sign__form">
          <label className="sing__label" htmlFor="name">
            Имя
          </label>
          <input
            className="sign__input"
            name="name"
            required
            placeholder="Ваше имя"
          />

          <label className="sing__label" htmlFor="email">
            E-mail
          </label>
          <input
            className="sign__input"
            name="email"
            type="email"
            required
            placeholder="Ваша почта"
          />

          <label className="sing__label" htmlFor="password" type="password">
            Пароль
          </label>
          <input
            className="sign__input sign__input_error"
            name="password"
            placeholder=""
            type="password"
            value="qwerty"
            required
          />
          <span className="sign__error">Что-то пошло не так...</span>

          <button className="sign__submit transparent-link">
            Зарегистрироваться
          </button>
          <p className="sign__text">
            Уже зарегистрированы?
            <a href="/signin" className="sign__link transparent-link">
              Войти
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Register;

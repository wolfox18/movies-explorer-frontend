import React from "react";
import "../Register/Register.css";

function Login() {
  return (
    <section className="sign">
      <div className="sign__container">
        <a href="/" className="sign__logo transparent-link" />
        <h1 className="sign__title">Рады видеть!</h1>
        <form className="sign__form">
          <label className="sing__label" htmlFor="email">
            E-mail
          </label>
          <input
            className="sign__input"
            name="email"
            placeholder="Ваша почта"
            type="email"
            required
          />

          <label className="sing__label" htmlFor="password" type="password">
            Пароль
          </label>
          <input
            className="sign__input"
            name="password"
            placeholder=""
            type="password"
            required
          />
          <span className="sign__error"></span>

          <button className="sign__submit transparent-link">Войти</button>
          <p className="sign__text">
            Ещё не зарегистрированы?
            <a href="/signup" className="sign__link transparent-link">
              Регистрация
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;

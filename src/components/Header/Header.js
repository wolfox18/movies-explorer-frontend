/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";

function Header({ isLoggedIn, onBurgerClick }) {
  const location = useLocation();
  const isSignPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <header
      className={`header ${
        location.pathname === "/" ? "header_theme_dark" : "header_theme_light"
      }`}
    >
      <div
        className={`header__container ${
          isSignPage ? "header__contaiter_width_narrow" : ""
        }`}
      >
        <a href="/" className="header__logo transparent-link" />
        {isLoggedIn ? (
          <nav className="header__nav">
            <a
              href="/movies"
              className={`header__link transparent-link ${
                location.pathname === "/" ? "header__link_theme_dark" : ""
              } ${
                location.pathname === "/movies" ? "header__link_active" : ""
              }`}
            >
              Фильмы
            </a>
            <a
              href="/saved-movies"
              className={`header__link transparent-link ${
                location.pathname === "/" ? "header__link_theme_dark" : ""
              } ${
                location.pathname === "/saved-movies"
                  ? "header__link_active"
                  : ""
              }`}
            >
              Сохраненные фильмы
            </a>
          </nav>
        ) : (
          <></>
        )}
        {isLoggedIn ? (
          <>
            <a className="header__account transparent-link" href="/profile">
              Аккаунт
            </a>
            <button
              className={`header__burger transparent-link ${
                location.pathname === "/" ? "header__burger_theme_dark" : ""
              }`}
              onClick={onBurgerClick}
            />
          </>
        ) : (
          <div className="header__sign">
            <a href="/signup" className="header__signup transparent-link">
              Регистрация
            </a>
            <a href="/signin" className="header__signin transparent-link">
              Войти
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

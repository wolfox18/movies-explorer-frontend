/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import { useLocation, Link } from "react-router-dom";
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
        <Link to="/" className="header__logo transparent-link" />
        {isLoggedIn ? (
          <nav className="header__nav">
            <Link
              to="/movies"
              className={`header__link transparent-link ${
                location.pathname === "/" ? "header__link_theme_dark" : ""
              } ${
                location.pathname === "/movies" ? "header__link_active" : ""
              }`}
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className={`header__link transparent-link ${
                location.pathname === "/" ? "header__link_theme_dark" : ""
              } ${
                location.pathname === "/saved-movies"
                  ? "header__link_active"
                  : ""
              }`}
            >
              Сохраненные фильмы
            </Link>
          </nav>
        ) : (
          <></>
        )}
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="header__account transparent-link">
              Аккаунт
            </Link>
            <button
              className={`header__burger transparent-link ${
                location.pathname === "/" ? "header__burger_theme_dark" : ""
              }`}
              onClick={onBurgerClick}
            />
          </>
        ) : (
          <div className="header__sign">
            <Link to="/signup" className="header__signup transparent-link">
              Регистрация
            </Link>
            <Link to="/signin" className="header__signin transparent-link">
              Войти
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

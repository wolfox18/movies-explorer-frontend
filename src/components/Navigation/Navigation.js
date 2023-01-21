import React from "react";
import { useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isOpened, onCloseNavTab }) {
  const location = useLocation();
  return (
    <div className={`navigation ${isOpened ? "navigation_opened" : ""}`}>
      <div className="navigation__container">
        <button
          onClick={onCloseNavTab}
          className="navigation__close transparent-link"
        />
        <ul className="navigation__links">
          <li className="navigation__item">
            <a
              href="/"
              className={`navigation__link transparent-link ${
                location.pathname === "/" ? "navigation__link_active" : ""
              }`}
            >
              Главная
            </a>
          </li>
          <li className="navigation__item">
            <a
              href="/movies"
              className={`navigation__link transparent-link ${
                location.pathname === "/movies" ? "navigation__link_active" : ""
              }`}
            >
              Фильмы
            </a>
          </li>
          <li className="navigation__item">
            <a
              href="/saved-movies"
              className={`navigation__link transparent-link ${
                location.pathname === "/saved-movies"
                  ? "navigation__link_active"
                  : ""
              }`}
            >
              Сохранённые фильмы
            </a>
          </li>
        </ul>
        <a href="/profile" className="navigation__bottom-link transparent-link">
          Аккаунт
        </a>
      </div>
    </div>
  );
}

export default Navigation;

import React from "react";
import { useLocation, Link } from "react-router-dom";
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
            <Link
              to="/"
              className={`navigation__link transparent-link ${
                location.pathname === "/" ? "navigation__link_active" : ""
              }`}
            >
              Главная
            </Link>
          </li>
          <li className="navigation__item">
            <Link
              to="/movies"
              className={`navigation__link transparent-link ${
                location.pathname === "/movies" ? "navigation__link_active" : ""
              }`}
            >
              Фильмы
            </Link>
          </li>
          <li className="navigation__item">
            <Link
              to="/saved-movies"
              className={`navigation__link transparent-link ${
                location.pathname === "/saved-movies"
                  ? "navigation__link_active"
                  : ""
              }`}
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link to="/profile" className="navigation__bottom-link transparent-link">
          Аккаунт
        </Link>
      </div>
    </div>
  );
}

export default Navigation;

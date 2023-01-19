import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h3 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h3>
        <div className="footer__info">
          <p className="footer__copyright">&copy; 2023</p>
          <div className="footer__links">
            <a
              href="https://practicum.yandex.ru/"
              target="_blank"
              className="footer__link transparent-link"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
            <a
              href="https://github.com/wolfox18/movies-explorer-frontend"
              target="_blank"
              className="footer__link transparent-link"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

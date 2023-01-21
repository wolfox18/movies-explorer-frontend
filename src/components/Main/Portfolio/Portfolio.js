import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="block">
      <div className="block__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__links">
          <li className="portfolio__link-block">
            <a
              href="https://wolfox18.github.io/how-to-learn/"
              target="_blank"
              className="portfolio__link transparent-link"
              rel="noreferrer"
            >
              <p className="portfolio__link-name">Десктопная вестка</p>
              <p className="portfolio__link-arrow">&#8599;</p>
            </a>
          </li>
          <li className="portfolio__link-block">
            <a
              href="https://wolfox18.github.io/russian-travel/"
              target="_blank"
              className="portfolio__link transparent-link"
              rel="noreferrer"
            >
              <p className="portfolio__link-name">Адаптивная верстка</p>
              <p className="portfolio__link-arrow">&#8599;</p>
            </a>
          </li>
          <li className="portfolio__link-block">
            <a
              href="https://nshikalenko.nomoredomains.club/"
              target="_blank"
              className="portfolio__link transparent-link"
              rel="noreferrer"
            >
              <p className="portfolio__link-name">
                React приложение с блэкджеком и бэкендом
              </p>
              <p className="portfolio__link-arrow">&#8599;</p>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;

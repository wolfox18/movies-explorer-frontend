import React from "react";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="notfound">
      <div className="notfound__contaner">
        <div className="notfound__info">
          <h1 className="notfound__title">404</h1>
          <div className="notfound__description">Страница не найдена</div>
        </div>
        <a href="/" className="notfound__link transparent-link">
          Назад
        </a>
      </div>
    </main>
  );
}

export default NotFound;

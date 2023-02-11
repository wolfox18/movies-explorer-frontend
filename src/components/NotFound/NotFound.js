import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();
  const handleBackCkick = () => {
    navigate(-1);
  }
  return (
    <main className="notfound">
      <div className="notfound__contaner">
        <div className="notfound__info">
          <h1 className="notfound__title">404</h1>
          <div className="notfound__description">Страница не найдена</div>
        </div>
        <button onClick={handleBackCkick} className="notfound__link transparent-link">
          Назад
        </button>
      </div>
    </main>
  );
}

export default NotFound;

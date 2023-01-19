import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import "../Register/Register.css";
import "./Profile.css";

function Profile({onBurgerClick, isNavTabOpened, onCloseNavTab}) {
  return (
    <>
      <Header isLoggedIn={true} onBurgerClick={onBurgerClick}/>
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">Привет, Username!</h1>
          <form className="profile__form">
            <ul className="profile__fields">
              <li className="profile__input-layout">
                <label className="profile__label" htmlFor="name">
                  Имя
                </label>
                <input
                  className="profile__input"
                  name="name"
                  value="Username"
                  required
                />
              </li>

              <li className="profile__input-layout">
                <label className="profile__label" htmlFor="name">
                  E-mail
                </label>
                <input
                  className="profile__input"
                  name="name"
                  value="email@yandex.ru"
                  required
                />
              </li>
            </ul>
            <button className="profile__submit transparent-link">
              Редактировать
            </button>
            <button className="profile__submit profile__submit_type_colored transparent-link">
              Выйти из аккаунта
            </button>
          </form>
        </div>
      </section>
      <Navigation isOpened={isNavTabOpened} onCloseNavTab={onCloseNavTab}/>
    </>
  );
}

export default Profile;

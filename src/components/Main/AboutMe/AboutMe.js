import React from "react";
import "./AboutMe.css";
import studentPhoto from "../../../images/student.jpg";

function AboutMe() {
  return (
    <section id="about-me" className="block">
      <div className="block__container">
        <h2 className="block__title">Кто это сделал</h2>
        <div className="aboutme__container">
          <img
            src={studentPhoto}
            alt="Фотография автора"
            className="aboutme_photo"
          />
          <div className="aboutme__info">
            <div className="aboutme__bio">
              <h3 className="aboutme__name">Николай</h3>
              <p className="aboutme__sutitle">Студент Практикума, 37 лет</p>
              <p className="aboutme__description">
                Я учусь на веб-разнаботчика, а не копирайтера. Не хочу писать.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in.
              </p>
            </div>
            <a
              href="https://github.com/wolfox18"
              target="_blank"
              className="aboutme__link transparent-link"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;

import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section id="about-project" className="block">
      <div className="block__container">
        <h2 className="block__title">О проекте</h2>
        <ul className="about__columns">
          <li className="about__column">
            <h3 className="about__subtitle">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className="about__column">
            <h3 className="about__subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="about__progress-bar">
          <div className="about__cell about__cell_color_green">
            <span className="about__cell-text">1 неделя</span>
          </div>
          <div className="about__cell about__cell_color_grey">
            <span className="about__cell-text">4 недели</span>
          </div>
          <div className="about__cell about__cell_color_transparent">
            <span className="about__cell-text">Back-end</span>
          </div>
          <div className="about__cell about__cell_color_transparent">
            <span className="about__cell-text">Front-end</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;

import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <section id="techs" className="block block_color_grey">
      <div className="block__container">
        <h2 className="block__title">Технологии</h2>
        <div className="techs__content">
          <h3 className="techs__title">7 технологий</h3>
          <p className="techs__description">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
        </div>
        <ul className="techs__list">
          <li className="techs__element">
            <span className="techs__label">HTML</span>
          </li>
          <li className="techs__element">
            <span className="techs__label">CSS</span>
          </li>
          <li className="techs__element">
            <span className="techs__label">JS</span>
          </li>
          <li className="techs__element">
            <span className="techs__label">React</span>
          </li>
          <li className="techs__element">
            <span className="techs__label">Git</span>
          </li>
          <li className="techs__element">
            <span className="techs__label">Express.js</span>
          </li>
          <li className="techs__element">
            <span className="techs__label">mongoDB</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;

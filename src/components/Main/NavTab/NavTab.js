import React from "react";
import "./NavTab.css";

function NavTab() {
  return (
    <section aria-label="Навигация"className="navtab">
      <nav className="navtab__nav">
        <a href="#about-project" className="navtab__link transparent-link">
          О проекте
        </a>
        <a href="#techs" className="navtab__link transparent-link">
          Технологии
        </a>
        <a href="#about-me" className="navtab__link transparent-link">
          Студент
        </a>
      </nav>
    </section>
  );
}

export default NavTab;
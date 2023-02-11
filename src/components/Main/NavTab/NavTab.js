import React from "react";
import { Link } from "react-router-dom";
import "./NavTab.css";

function NavTab() {
  return (
    <section aria-label="Навигация"className="navtab">
      <nav className="navtab__nav">
        <Link to="#about-project" className="navtab__link transparent-link">
          О проекте
        </Link>
        <Link to="#techs" className="navtab__link transparent-link">
          Технологии
        </Link>
        <Link to="#about-me" className="navtab__link transparent-link">
          Студент
        </Link>
      </nav>
    </section>
  );
}

export default NavTab;
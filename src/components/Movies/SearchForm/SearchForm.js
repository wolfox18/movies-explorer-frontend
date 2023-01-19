import React from "react";
import "./SearchForm.css";

function SearchForm() {
  const [isChecked, setIsChecked] = React.useState(false);
  const onCheckboxClick = () => {
    setIsChecked(!isChecked);
  }
  return (
    <section className="searchblock">
      <div className="searchblock__container">
        <form className="searchform">
          <div className="searchform__search">
            <div className="searchform__icon" />
            <input className="searchform__input" placeholder="Фильм" />
            <button className="searchform__submit transparent-link" />
          </div>
          <div className="searchform__filter" onClick={onCheckboxClick}>
            <input type="checkbox" name="shortfilm" checked={isChecked} className="searchform__checkbox" />
            <label className="searchform__checkbox-label" htmlFor="shortfilm" />
            <label className="searchform__checkbox-text" htmlFor="shortfilm">Короткометражки</label>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;

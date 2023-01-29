import React from "react";
import "./SearchForm.css";

function SearchForm(props) {
  const {onSearch, onShortsChange, searchKey, isShortsChecked, onShortsCheckboxClick, onSearchInputChange} = props;

  const handleCheckBoxChange = () => {
    onShortsChange();
  }

  return (
    <section aria-label="Поиск" className="searchblock">
      <div className="searchblock__container">
        <form className="searchform" onSubmit={onSearch}>
          <div className="searchform__search">
            <div className="searchform__icon" />
            <input className="searchform__input" placeholder="Фильм" value={searchKey} onChange={onSearchInputChange} required />
            <button className="searchform__submit transparent-link" />
          </div>
          <div className="searchform__filter" onClick={onShortsCheckboxClick}>
            <input type="checkbox" name="shortfilm" checked={isShortsChecked} onChange={handleCheckBoxChange} className="searchform__checkbox" />
            <label className="searchform__checkbox-label" htmlFor="shortfilm" />
            <label className="searchform__checkbox-text" htmlFor="shortfilm">Короткометражки</label>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;

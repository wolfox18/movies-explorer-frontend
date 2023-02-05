import React from "react";
import "./SearchForm.css";

function SearchForm(props) {
  const {
    onSearch,
    onShortsChange,
    searchKey,
    isShortsChecked,
    onShortsCheckboxClick,
    onSearchInputChange,
  } = props;
  const [validations, setValidations] = React.useState({
    isValid: false,
    errorText: "",
  });
  React.useEffect(() => {
    if (searchKey.length === 0) {
      setValidations({
        isValid: false,
        errorText: "Необходимо заполнить поле поиска",
      });
    } else {
      setValidations({ isValid: true, errorText: "" });
    }
  }, [searchKey]);

  const handleCheckBoxChange = () => {
    onShortsChange();
  };

  return (
    <section aria-label="Поиск" className="searchblock">
      <div className="searchblock__container">
        <form className="searchform" onSubmit={onSearch}>
          <div className="searchform__search">
            <div className="searchform__icon" />
            <input
              className="searchform__input"
              placeholder="Фильм"
              value={searchKey}
              onChange={onSearchInputChange}
              required
            />
            <button
              className="searchform__submit transparent-link"
              disabled={validations.isValid ? false : true}
            />
          </div>
          <div className="searchform__filter" onClick={onShortsCheckboxClick}>
            <input
              type="checkbox"
              name="shortfilm"
              checked={isShortsChecked}
              onChange={handleCheckBoxChange}
              className="searchform__checkbox"
            />
            <label className="searchform__checkbox-label" htmlFor="shortfilm" />
            <label className="searchform__checkbox-text" htmlFor="shortfilm">
              Короткометражки
            </label>
          </div>
          <span className="searform__error">{validations.errorText}</span>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;

// import React from "react";
// import "./SearchForm.css";

// function SearchForm(props) {
//   const {onSearch, onShortsChange, searchKey, isShortsChecked, onShortsCheckboxClick, onSearchInputChange} = props;
//   const {isValid, setIsValid} = React.useState(false);
//   const {errorText, setErrorText} = React.useState("");

//   React.useEffect (()=> {
//     if (searchKey.length === 0) {
//       setIsValid(false);
//       setErrorText("Необходимо заполнить это поле");
//     } else {
//       setIsValid(true);
//       setErrorText("");
//     }
//   }, [searchKey])

//   const handleCheckBoxChange = () => {
//     onShortsChange();
//   }

//   return (
//     <section aria-label="Поиск" className="searchblock">
//       <div className="searchblock__container">
//         <form className="searchform" onSubmit={onSearch}>
//           <div className="searchform__search">
//             <div className="searchform__icon" />
//             <input className="searchform__input" placeholder="Фильм" value={searchKey} onChange={onSearchInputChange} required />
//             <button className="searchform__submit transparent-link" disabled={isValid ? false : true}/>
//           </div>
//           <div className="searchform__filter" onClick={onShortsCheckboxClick}>
//             <input type="checkbox" name="shortfilm" checked={isShortsChecked} onChange={handleCheckBoxChange} className="searchform__checkbox" />
//             <label className="searchform__checkbox-label" htmlFor="shortfilm" />
//             <label className="searchform__checkbox-text" htmlFor="shortfilm">Короткометражки</label>
//           </div>
//           <span className="searform__error">{errorText}</span>
//         </form>
//       </div>
//     </section>
//   );
// }

// export default SearchForm;

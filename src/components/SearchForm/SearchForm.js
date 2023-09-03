import React, { useState, useEffect } from "react";
import search from "../../images/text__COLOR_invisible.svg";

import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = ({
  handleGetMovies,
  moviesSwitcher,
  moviesSearchValues,
  setSwitcher,
  switcher
}) => {
  const [inputSearch, setInputSearch] = useState("");

  function handleInputChange(e) {
    setInputSearch(e.target.value);
  }

  function handleSwitcherChange() {
    const switcherOn = !switcher;
    setSwitcher(switcherOn);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleGetMovies(inputSearch);
  }

  useEffect(() => {
    setSwitcher(moviesSwitcher);
    setInputSearch(moviesSearchValues);
  }, [moviesSwitcher, moviesSearchValues]);

  return (
    <section className="section__block section__block_type_search">
      <div className="search__container">
        <form className="form search__wrapper">
          <input
            className="search__input"
            type="text"
            placeholder="Фильм"
            value={inputSearch || ""}
            onChange={handleInputChange}
            required
          />
          <button
            className="search__button"
            type="submit"
            onClick={handleSubmit}
          >
            <img src={search} alt="стрелка" />
          </button>
        </form>
        <FilterCheckbox
          handleSwitcherChange={handleSwitcherChange}
          checked={switcher}
        />
      </div>
    </section>
  );
};

export default SearchForm;

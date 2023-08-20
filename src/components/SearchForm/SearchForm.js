import React from "react";
import search from "../../images/text__COLOR_invisible.svg";

import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
  return (
    <section className="section__block section__block_type_search">
      <div className="search__container">
        <form className="form search__wrapper">
          <input
            className="search__input"
            type="text"
            placeholder="Фильм"
            required
          />
          <button className="search__button">
            <img src={search} alt="стрелка" />
          </button>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  );
};

export default SearchForm;

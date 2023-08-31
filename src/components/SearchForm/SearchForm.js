import React, { useState, useEffect } from "react";
import search from "../../images/text__COLOR_invisible.svg";
import { useLocation } from "react-router-dom";

import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { MAX_DURATION_SHORT_MOVIE } from "../../utils/constants";
import { addToLocalStorage } from "../../utils/utils";

const SearchForm = ({
  handleGetMovies,
  moviesSwitcher,
  moviesSearchValues,
  setMoviesShowedWithSwitcher,
  setMoviesWithSwitcher,
  moviesShowed,
  movies,
  moviesShowedWithSwitcher,
  moviesWithSwitcher,
  setMoviesShowed,
  setMovies,
}) => {
  const [inputSearch, setInputSearch] = useState("");
  const [switcher, setSwitcher] = useState(false);
  const location = useLocation();

  async function handleGetShorties(switcher) {
    let filterDataShowed = [];
    let filterData = [];

    if (switcher) {
      setMoviesShowedWithSwitcher(moviesShowed);
      setMoviesWithSwitcher(movies);
      filterDataShowed = moviesShowed.filter(
        ({ duration }) => duration <= MAX_DURATION_SHORT_MOVIE
      );
      filterData = movies.filter(
        ({ duration }) => duration <= MAX_DURATION_SHORT_MOVIE
      );
    } else {
      filterDataShowed = moviesShowedWithSwitcher;
      filterData = moviesWithSwitcher;
    }

    if (location.pathname === "/movies") {
      addToLocalStorage(
        "movies",
        JSON.stringify(filterDataShowed.concat(filterData))
      );
      addToLocalStorage("moviesSwitcher", switcher);
    }

    setMoviesShowed(filterDataShowed);
    setMovies(filterData);
  }

  function handleInputChange(e) {
    setInputSearch(e.target.value);
  }

  function handleSwitcherChange() {
    const switcherOn = !switcher;
    setSwitcher(switcherOn);
    handleGetShorties(switcherOn);
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

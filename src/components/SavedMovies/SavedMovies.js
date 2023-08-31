import React, { useState, useEffect } from 'react';

import './SavedMovies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

import { MAX_DURATION_SHORT_MOVIE, deleteMoviesError, saveMoviesError, serverError } from '../../utils/constants';
import mainApi from '../../utils/MainApi';

const SavedMovies = ({ isLoggedIn, openPopup }) => {
    const [movies, setMovies] = useState([]);
    const [moviesShowed, setMoviesShowed] = useState([]);
    const [moviesWithSwitcher, setMoviesWithSwitcher] = useState([]);
    const [moviesShowedWithSwitcher, setMoviesShowedWithSwitcher] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function handleGetMovies(searchValues, switcher) {
        setIsLoading(true);

        try {
            let filterData = movies.filter(({ nameRU }) => nameRU.toLowerCase().includes(searchValues.toLowerCase()));

            if (switcher) filterData = filterData.filter(({ duration }) => duration <= MAX_DURATION_SHORT_MOVIE);

            setMoviesShowed(filterData);
        } catch (err) {
            openPopup(saveMoviesError);
            setMovies([]);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSaveClick(movie, isSavedMovie) {
        if (!isSavedMovie) {
            try {
                await mainApi.delMovie(movie._id);
                setMovies((movies) =>
                    movies.filter((newSaved) => newSaved._id !== movie._id));
                setMoviesShowed((movies) =>
                    movies.filter((newSaved) => newSaved._id !== movie._id));
            } catch {
                openPopup(deleteMoviesError);
            }
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            mainApi
                .getSavedMovies()
                .then((data) => {
                    setMovies(data);
                    setMoviesShowed(data);
                })
                .catch(() => {
                    openPopup(serverError);
                });
        }
    }, [isLoggedIn]);

    return (
        <>
            <Header isLoginPanelVisible={!isLoggedIn}>
                <Navigation isMenuVisible={isLoggedIn}/>
            </Header>
            <main className='main'>
                <SearchForm handleGetMovies={handleGetMovies}
                            moviesSwitcher={false}
                            moviesSearchValues={''}
                            moviesWithSwitcher={moviesWithSwitcher}
                            setMoviesWithSwitcher={setMoviesWithSwitcher}
                            moviesShowedWithSwitcher={moviesShowedWithSwitcher}
                            setMoviesShowedWithSwitcher={setMoviesShowedWithSwitcher}
                            movies={movies}
                            setMovies={setMovies}
                            moviesShowed={moviesShowed}
                            setMoviesShowed={setMoviesShowed}
                />
                {isLoading ? <Preloader/> : <MoviesCardList movies={moviesShowed}
                                                            savedMovies={moviesShowed}
                                                            restOfMovieList={[]}
                                                            onSaveMovie={handleSaveClick} />}
            </main>
            <Footer/>
        </>
    );
}

export default SavedMovies;

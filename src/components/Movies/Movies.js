import React, {useEffect, useState} from 'react';

import './Movies.css';

import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { addToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '../../utils/utils';
import {
    MOVIES_BASE_URL,
    downloadMoviesError,
    searchMoviesError,
    deleteMoviesError,
    saveMoviesError,
    nothingSearched,
} from '../../utils/constants';
import getRenderMoviesCount from '../../utils/getRenderMoviesCount';

const Movies = ({ isLoggedIn, openPopup }) => {
    const [movies, setMovies] = useState([]);
    const [moviesSaved, setMoviesSaved] = useState([]);
    const [moviesShowed, setMoviesShowed] = useState([]);
    const [moviesWithSwitcher, setMoviesWithSwitcher] = useState([]);
    const [moviesShowedWithSwitcher, setMoviesShowedWithSwitcher] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [moviesCount, setMoviesCount] = useState([]);
    const [moviesSwitcher, setMoviesSwitcher] = useState(false);
    const [moviesSearchValues, setMoviesSearchValues] = useState('');
    const [isGetMoviesFirst, setIsGetMoviesFirst] = useState(true)

    useEffect(() => {
        setMoviesCount(getRenderMoviesCount());
        const handlerResize = () => setMoviesCount(getRenderMoviesCount());
        window.addEventListener('resize', handlerResize);

        return () => {
            window.removeEventListener('resize', handlerResize);
        };
    }, []);

    function handleMore() {
        const spliceMovies = movies;
        const newMoviesShowed = moviesShowed.concat(spliceMovies.splice(0, moviesCount[1]));
        setMoviesShowed(newMoviesShowed);
        setMovies(spliceMovies);
    }


    function setMoviesData(movies, searchValues) {
        const filterData = movies.filter(({nameRU}) => nameRU.toLowerCase().includes(searchValues.toLowerCase()));
        const filterDataWithLiked = filterData.map(item => ({
            ...item,
            isLiked: moviesSaved.some(saved => saved.movieId === item.id)
        }));
        addToLocalStorage('movies', JSON.stringify(filterDataWithLiked));
        addToLocalStorage('moviesSearchValues', searchValues);

        const spliceData = filterDataWithLiked.splice(0, moviesCount[0]);

        if (filterData.length === 0) {
            openPopup(nothingSearched);
        }
        setMoviesShowed(spliceData);
        setMovies(filterDataWithLiked);
        setMoviesShowedWithSwitcher(spliceData);
        setMoviesWithSwitcher(filterDataWithLiked);
    }

    async function handleGetMoviesFirst(searchValues) {
        setMoviesSwitcher(false);
        addToLocalStorage('moviesSwitcher', null);

        if (!searchValues) {
            openPopup(searchMoviesError);
            return false;
        }
        setIsLoading(true);

        try {
            const movies = await moviesApi.getMovies();
            addToLocalStorage('allMovies', JSON.stringify(movies))
            setMoviesData(movies, searchValues);
            setIsGetMoviesFirst(false);
        } catch (err) {
            openPopup(downloadMoviesError);
            setMovies([]);
            removeFromLocalStorage('movies');
            removeFromLocalStorage('moviesSwitcher');
            removeFromLocalStorage('moviesSearchValues');
        } finally {
            setIsLoading(false);
        }
    }

    function handleGetMovies(searchValues) {
        setMoviesSwitcher(false);
        addToLocalStorage('moviesSwitcher', null);

        if (!searchValues) {
            openPopup(searchMoviesError);
            return false;
        }
        setIsLoading(true);

        const movies = getFromLocalStorage('allMovies');
        setMoviesData(JSON.parse(movies), searchValues);
        setIsLoading(false);
    }

    async function handleSaveClick(movie, isSavedMovie) {
        if (isSavedMovie) {
            const dataMovies = {
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: MOVIES_BASE_URL + movie.image.url,
                trailerLink: movie.trailerLink,
                thumbnail: MOVIES_BASE_URL + movie.image.formats.thumbnail.url,
            };
            try {
                const newSaved = await mainApi.saveMovie(dataMovies);
                if (newSaved) {
                    setMoviesSaved((movies) => [...movies, newSaved.movie]);
                }
            } catch (err) {
                openPopup(saveMoviesError);
                console.log(`Произошла ошибка при сохранении фильма: ${err}`);
            }
        } else {
            try {
                await mainApi.delMovie(movie._id);
                setMoviesSaved((movies) =>
                    movies.filter((newSaved) => newSaved._id !== movie._id));
            } catch (err) {
                openPopup(deleteMoviesError);
                console.log(`Произошла ошибка при удалении фильма: ${err}`);
            }
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            const jwt = getFromLocalStorage('jwt');
            if (!jwt) {
                return;
            }
            mainApi
                .getSavedMovies()
                .then((data) => {
                    setMoviesSaved(data);
                    console.log('Сохраненные фильмы успешно загружены');
                })
                .catch((err) => {
                    openPopup(downloadMoviesError);
                    console.log(`Произошла ошибка при загрузке фильмов: ${err}`);
                });

            const localStorageMovies = getFromLocalStorage('movies');

            if (localStorageMovies) {
                const filterData = JSON.parse(localStorageMovies);
                setMoviesShowed(filterData.splice(0, getRenderMoviesCount()[0]));
                setMovies(filterData);
                setIsLoading(false);
            }

            const localStorageMoviesSwitcher = getFromLocalStorage('moviesSwitcher');
            const localStorageMoviesSearchValues = getFromLocalStorage('moviesSearchValues');

            if (localStorageMoviesSwitcher) {
                setMoviesSwitcher(localStorageMoviesSwitcher === 'true');
            }

            if (localStorageMoviesSearchValues) {
                setMoviesSearchValues(localStorageMoviesSearchValues);
            }
        }
    }, [isLoggedIn]);

    return (
        <>
            <Header isLoginPanelVisible={!isLoggedIn}>
                <Navigation isMenuVisible={isLoggedIn}/>
            </Header>

            <main className='main'>
                <SearchForm handleGetMovies={isGetMoviesFirst ? handleGetMoviesFirst : handleGetMovies}
                            moviesSwitcher={moviesSwitcher}
                            moviesSearchValues={moviesSearchValues}
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
                                                            savedMovies={moviesSaved}
                                                            onSaveMovie={handleSaveClick}
                                                            restOfMovieList={movies}
                                                            handleMore={handleMore}/>}
            </main>

            <Footer/>
        </>
    );
}

export default Movies;

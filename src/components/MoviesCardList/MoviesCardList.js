import React from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ movies, savedMovies, onSaveMovie, handleMore, restOfMovieList }) => {
    const location = useLocation();

    return (
        <section className='section__block section__block_type_movies'>
            <div className='movies__container'>
                <ul className='movies__cards'>
                    {movies.map((movie) => (
                        <MoviesCard
                            key={movie.movieId || movie.id}
                            movie={movie}
                            savedMovies={savedMovies}
                            isSavedMoviesPage={location.pathname === '/saved-movies'}
                            onSaveMovie={onSaveMovie}
                        />
                    ))}
                </ul>
                {location.pathname !== '/saved-movies' && restOfMovieList.length > 0 && (<button className='movies__button' onClick={handleMore}>Ещё</button>)}
            </div>
        </section>
    );
}

export default MoviesCardList;

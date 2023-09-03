import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

import { convertTime } from '../../utils/utils';
import { MOVIES_BASE_URL } from "../../utils/constants";

const MoviesCard = ({ movie, savedMovies, isSavedMoviesPage, onSaveMovie }) => {
    const [isMouseInCard, setIsMouseInCard] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    const [isSavedMovie, setIsSavedMovie] = useState(false);
    const isMobile = width < 768;
    const cardRef = useRef();
    const cardSaveButtonClassName = (`card__like ${isSavedMovie ? 'card__like_active' : ''}`);

    const cardDeleteButtonClassName = 'link card__del-button';

    const location = useLocation();

    useEffect(() => {
        const card = cardRef.current;
        let mouseOverListener, mouseLeaveListener;
        if(card){
            mouseOverListener = card.addEventListener('mouseover', () => {
                setIsMouseInCard(true)
            });
            mouseLeaveListener = card.addEventListener('mouseleave', () => {
                setIsMouseInCard(false)
            });
        }

        return () => {
            if(card) {
                card.removeEventListener('mouseover', mouseOverListener)
                card.removeEventListener('mouseleave', mouseLeaveListener)
            }
        }
    }, [cardRef.current]);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    function handleSaveClick() {
        const newSavedMovie = !isSavedMovie;
        const savedMovie = savedMovies.filter((item) => {
            return item.movieId === movie.id;
        });
        onSaveMovie({ ...movie, _id: savedMovie.length > 0 ? savedMovie[0]._id : null }, newSavedMovie).then(()=>{
            setIsSavedMovie(true)
        });
    }

    useEffect(() => {
        if (location.pathname === '/movies') {
            const savedMovie = savedMovies.filter((item) => {
                return item.movieId === movie.id;
            });

            if (savedMovie.length > 0) {
                setIsSavedMovie(true);
            } else {
                setIsSavedMovie(false);
            }
        }
    }, [location.pathname, savedMovies, movie.id]);

    function handleDeleteClick() {
        onSaveMovie(movie);
    }

    return (
        <li className='card' ref={cardRef}>
            <a
                href={movie.trailerLink}
                className="link card__link"
                target="_blank"
                rel="noopener noreferrer">
            <img className='card__image'
                 src={isSavedMoviesPage ? movie.image : MOVIES_BASE_URL + movie.image.url} alt={movie.nameRU}/>
            </a>
            <div className='card__wrapper'>
                <h3 className='card__name'>{movie.nameRU}</h3>
                {!isSavedMoviesPage &&
                    <button className={cardSaveButtonClassName}
                            type='button'
                            aria-label='Сохранить в коллекцию'
                            onClick={handleSaveClick}
                    />
                }
                {isMouseInCard && isSavedMoviesPage && !isMobile && !isMobile &&
                    <button className={cardDeleteButtonClassName}
                            type='button'
                            aria-label='Удалить'
                            onClick={handleDeleteClick}
                    />
                }
                {isMobile && isSavedMoviesPage &&
                    <button className={cardDeleteButtonClassName}
                            type='button'
                            aria-label='Удалить'
                            onClick={handleDeleteClick}
                    />
                }
            </div>
            <p className='card__duration'>{convertTime(movie.duration)}</p>
        </li>
    );
}

export default MoviesCard;

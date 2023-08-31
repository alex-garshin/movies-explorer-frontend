import React from 'react';

import './Movies.css';

import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const Movies = ({ isLoading, isLoggedIn, onSaveMovie }) => {

    return (
        <>
            <Header isLoginPanelVisible={!isLoggedIn}>
                <Navigation isMenuVisible={isLoggedIn}/>
            </Header>
            <main className='main'>
                <SearchForm/>
                {isLoading ? <Preloader/> : <MoviesCardList onSaveMovie={onSaveMovie}/>}
            </main>
            <Footer/>
        </>
    );
}

export default Movies;

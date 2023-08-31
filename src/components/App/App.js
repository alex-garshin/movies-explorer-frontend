import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import './App.css';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute';

import CurrentUserContext from '../../context/CurrentUserContext';

import { authError, registerError, registerSuccess, updateError, updateSuccess } from '../../utils/constants';
import { addToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '../../utils/utils';
import mainApi from '../../utils/MainApi';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
            const jwt = getFromLocalStorage('jwt');
            if (jwt) {
                getUserData();
            }
    }, []);

    async function getUserData() {
            setIsLoading(true);
            try {
                await mainApi.getUserData()
                    .then((data) => {
                        setCurrentUser(data);
                        setIsLoggedIn(true);
                    });
            } catch (err) {
                console.log(`Произошла ошибка при авторизации: ${err}`);
            } finally {
                setIsLoading(false);
            }
    }

    async function onLogin(data) {
        setIsLoading(true);
        try {
            await mainApi.authorize(data)
                .then((res) => {
                    if (res.token) {
                        setIsLoggedIn(true);
                        addToLocalStorage('jwt', res.token);
                        mainApi.updateToken();
                        getUserData();
                        navigate('/movies');
                    }
                });
        } catch (err) {
            openPopup(`${authError}: ${err}`);
            console.log(`Произошла ошибка при авторизации: ${err}`);
        } finally {
            setIsLoading(false);
        }
    }

    async function onRegister({ name, email, password }) {
        setIsLoading(true);
        try {
            await mainApi.register({ name, email, password })
                .then(() => {
                    openPopup(registerSuccess);
                    onLogin({email, password});
                });
        } catch (err) {
            openPopup(`${registerError}: ${err}`);
            console.log(`Произошла ошибка при регистрации: ${err}`);
        } finally {
            setIsLoading(false);
        }
    }

    async function onUpdateUser(name, email) {
        setIsLoading(true);
        const jwt = getFromLocalStorage('jwt');
        if (!jwt) {
            return;
        }
        try {
            await mainApi.changeUserData({name, email});
            setCurrentUser ({name, email});
            openPopup(updateSuccess);
        } catch(err) {
            openPopup(`${updateError}: ${err}`);
            console.log(`Произошла ошибка при обновлении данных пользователя: ${err}`);
        } finally {
            setIsLoading(false);
        }
    }

    function onSignOut() {
        removeFromLocalStorage('jwt');
        removeFromLocalStorage('allMovies');
        removeFromLocalStorage('movies');
        removeFromLocalStorage('moviesSwitcher');
        removeFromLocalStorage('moviesSearchValues');
        setIsLoggedIn(false);
        navigate('/');
    }

    function openPopup(message) {
        setErrorMessage(message);
        setIsPopupOpen(true);
    }

    function closePopup() {
        setIsPopupOpen(false);
        setErrorMessage('');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                    <Routes>

                        <Route path='/sign-up' element={
                            isLoggedIn ? <Navigate to='/movies' replace /> : <Register onRegister={onRegister} />
                        }/>

                        <Route path='/sign-in' element={
                            isLoggedIn ? <Navigate to='/movies' replace /> : <Login onLogin={onLogin} />
                        }/>

                        <Route path='/' element={
                                <Main isLoggedIn={isLoggedIn}/>
                        }/>

                        <Route path='/movies' element={
                            <ProtectedRoute>
                                <Movies
                                    isLoggedIn={isLoggedIn}
                                    openPopup={openPopup}
                                />
                            </ProtectedRoute>
                        }/>

                        <Route path='/saved-movies' element={
                            <ProtectedRoute>
                                <SavedMovies
                                    isLoggedIn={isLoggedIn}
                                    openPopup={openPopup}
                                />
                            </ProtectedRoute>
                        }/>

                        <Route path='/profile' element={
                            <ProtectedRoute>
                                <Profile
                                    isLoggedIn={isLoggedIn}
                                    onUpdateUser={onUpdateUser}
                                    isLoading={isLoading}
                                    onSignOut={onSignOut}
                                />
                            </ProtectedRoute>
                        }/>

                        <Route path='*' element={
                            <Page404/>
                        }/>

                    </Routes>

                <InfoTooltip isOpen={isPopupOpen}
                             message={errorMessage}
                             onClose={closePopup}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

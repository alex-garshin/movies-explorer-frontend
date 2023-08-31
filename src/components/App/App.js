import React, {useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import './App.css';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';
import {UserContextProvider} from '../../context/UserContext';


function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

    const navigate = useNavigate();

    function handleClickSave() {
        setIsSaved((state) => !state);
    }

    function onSignOut() {
        setIsLoggedIn(false);
        navigate('/sign-in');
    }

    return (
        <UserContextProvider setIsLoading={setIsLoading}>
            <div className='page'>
                <Routes>
                    
                    <Route path='/sign-up' element={
                        <Register/>
                    }/>

                    <Route path='/sign-in' element={
                        <Login/>
                    }/>

                    <Route path='/' element={
                        <Main isLoggedIn={isLoggedIn}/>
                    }/>

                    <Route path='/movies' element={
                        <Movies
                            isLoading={isLoading}
                            isLoggedIn={isLoggedIn}
                            onSaveMovie={handleClickSave}
                        />
                    }/>

                    <Route path='/saved-movies' element={
                        <SavedMovies
                            isLoading={isLoading}
                            isLoggedIn={isLoggedIn}
                        />
                    }/>

                    <Route path='/profile' element={
                        <Profile
                            isLoggedIn={isLoggedIn}
                            onUpdateUser={(name, email) => {return {name, email}}}
                            onSignOut={onSignOut}
                        />
                    }/>

                    <Route path='*' element={
                        <Page404/>
                    }/>

                </Routes>
            </div>
        </UserContextProvider>
    );
}

export default App;

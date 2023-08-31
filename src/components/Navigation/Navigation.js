import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './Navigation.css';

const Navigation = ({isMenuVisible}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const navigateLinks = {
        home: '/',
        films: '/movies',
        savedFilms: '/saved-movies',
        profile: '/profile',
    }

    const [isOpen, setIsOpen] = React.useState(false);

    function toggleMenu() {
        setIsOpen((state) => !state);
    }

    return (
        isMenuVisible && (<div className='navigation'>
            <button
                type='button'
                className='navigation__open-button'
                aria-label='Меню'
                onClick={toggleMenu}/>

            <div
                className={`navigation__menu ${
                    isOpen ? 'navigation__menu_opened' : ''
                }`}
            >
                <nav className='navigation__panel'>
                    <button
                        type='button'
                        className='navigation__close-button'
                        aria-label='Закрыть'
                        onClick={toggleMenu}/>

                    <ul className='navigation__list'>
                        <li className='navigation__list-item'>
                            <Link
                                className={`link navigation__link ${location.pathname === navigateLinks.home ? 'navigation__link_active' : ''}`}
                                to={navigateLinks.home}>
                                Главная
                            </Link>
                        </li>
                        <li className='navigation__list-item'>
                            <Link
                                className={`link navigation__link ${location.pathname === navigateLinks.films ? 'navigation__link_active' : ''}`}
                                to={navigateLinks.films}>
                                Фильмы
                            </Link>
                        </li>
                        <li className='navigation__list-item'>
                            <Link
                                className={`link navigation__link ${location.pathname === navigateLinks.savedFilms ? 'navigation__link_active' : ''}`}
                                to={navigateLinks.savedFilms}>
                                Сохранённые фильмы
                            </Link>
                        </li>
                    </ul>
                    <button className='navigation__button-profile' onClick={() => navigate(navigateLinks.profile)}>
                        <span className='link navigation__link-profile'>Аккаунт</span>
                        <div className='navigation__logo-profile'/>
                    </button>
                </nav>
            </div>
        </div>)
    );
}

export default Navigation;

import React from 'react';
import { useNavigate } from "react-router-dom";

import './Header.css';

import headerLogo from '../../images/logo.svg';

const Header = ({isLoginPanelVisible, children}) => {
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/');
    }
    const navigateRegister = () => {
        navigate('/sign-up');
    }
    const navigateLogin = () => {
        navigate('/sign-in');
    }

    return (
        <header className='header page__header' id='header'>
            <img
                className='header__logo'
                src={headerLogo}
                alt='Логотип в форме кольца'
                onClick={navigateHome}
            />
            {children}
            {isLoginPanelVisible && (
                <nav className='header__right-menu'>
                    <span className='link header__link'
                          onClick={navigateRegister}>
                        Регистрация
                    </span>
                    <button className='header__button-login'
                            onClick={navigateLogin}>
                        Войти
                    </button>
                </nav>
            )}        </header>
    )
};

export default Header;

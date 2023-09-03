import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './AuthForm.css';

import useForm from '../../hooks/useForm';
import { regExEmail, regExPassword, regExName, regExAnySymbols } from '../../utils/constants';

function AuthForm({ onSubmit }) {
    const location = useLocation();
    const { enteredValues, errors, handleChange, isFormValid } = useForm({});

    const checkEnteredValues = (enteredValues) => {
        const checkForSignIn = !enteredValues.email || !enteredValues.password;
        const checkFromSignUp = !enteredValues.name || !enteredValues.email || !enteredValues.password;

        return location.pathname === '/sign-up' ? checkFromSignUp : checkForSignIn
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (checkEnteredValues(enteredValues)) {
            return;
        }

        onSubmit(enteredValues);
    };

    return (
        <form className='form auth__form'
              onSubmit={handleSubmit}
              noValidate>
            {location.pathname === '/sign-up' && (
                <>
                    <label className='auth__label' htmlFor='name'>Имя</label>
                    <input
                        className='auth__input'
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Имя'
                        value={enteredValues.name || ''}
                        onChange={handleChange}
                        pattern={regExName}
                        minLength={2}
                        maxLength={30}
                        autoComplete='off'
                        required
                    />
                    <span className='auth__input-error' id='name-error'>{errors.name}</span>
                </>
                )}

            <label className='auth__label' htmlFor='email'>E-mail</label>
            <input className='auth__input'
                   type='email'
                   name='email'
                   id='email'
                   placeholder='Email'
                   value={enteredValues.email || ''}
                   onChange={handleChange}
                   pattern={regExEmail}
                   required
            />
            <span className='auth__input-error' id='email-error'>{errors.email}</span>

            <label className='auth__label' htmlFor='password'>Пароль</label>
            <input className='auth__input'
                   type='password'
                   name='password'
                   id='password'
                   placeholder='Пароль'
                   value={enteredValues.password || ''}
                   onChange={handleChange}
                   pattern={location.pathname === "/sign-up" ? regExPassword : regExAnySymbols}
                   minLength={6}
                   required
            />
            <span className='auth__input-error' id='password-error'>{errors.password}</span>
            <div className='auth__bottom'>
                <button className='auth__button'
                        type='submit'
                        disabled={!isFormValid}>
                    {location.pathname === "/sign-in" ? "Войти" : "Зарегистрироваться"}
                </button>
                <p className='auth__link-text'>
                    {location.pathname === "/sign-in" ? "Ещё не зарегистрированы?" : "Уже зарегистрированы?"}
                    <Link className='link auth__link' to={location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'}>
                        {location.pathname === "/sign-in" ? "Регистрация" : "Войти"}
                    </Link>
                </p>
            </div>
        </form>
    );
}

export default AuthForm;

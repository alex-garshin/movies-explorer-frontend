import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Login.css';
import useForm from '../../hooks/useForm';
import logo from '../../images/logo.svg';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
    }
    const {enteredValues, errors, handleChange, isFormValid} = useForm({});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!enteredValues.email || !enteredValues.password) {
            return;
        }
        onLogin(enteredValues);
    };

    return (
        <main className='main'>
            <section className='section__block section__block_type_login'>
                <div className='login__container'>
                    <div className='login__wrapper'>
                        <div className='login__header'>
                            <img className='link login__logo'
                                 src={logo}
                                 alt='Логотип в форме кольца'
                                 onClick={navigateHome}
                            />
                        </div>
                        <h1 className='login__title'>Рады видеть!</h1>

                        <form className='form login__form'
                              onSubmit={handleSubmit}
                              noValidate>
                            <label className='login__label' htmlFor='email'>E-mail</label>
                            <input className='login__input'
                                   type='email'
                                   name='email'
                                   id='email'
                                   placeholder='Email'
                                   value={enteredValues.email || ''}
                                   onChange={handleChange}
                                   required
                            />
                            <span className='login__input-error' id='email-error'>{errors.email}</span>

                            <label className='login__label' htmlFor='password'>Пароль</label>
                            <input className='login__input'
                                   type='password'
                                   name='password'
                                   id='password'
                                   placeholder='Пароль'
                                   value={enteredValues.password || ''}
                                   onChange={handleChange}
                                   required
                            />
                            <span className='login__input-error' id='password-error'>{errors.password}</span>
                        </form>
                    </div>

                    <div className='login__bottom'>
                        <button className='login__button'
                                type='submit'
                                disabled={!isFormValid}>
                            Войти
                        </button>
                        <p className='login__link-text'>
                            Ещё не зарегистрированы?
                            <Link className='link login__link' to='/sign-up'>
                                Регистрация
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
};

export default Login;

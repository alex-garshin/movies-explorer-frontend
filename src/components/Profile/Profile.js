import React, {useState, useContext} from 'react';

import './Profile.css';

import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import useForm from '../../hooks/useForm';
import {UserContext} from '../../context/UserContext';

const Profile = ({ isLoggedIn, onUpdateUser, onSignOut }) => {
    const user = useContext(UserContext);

    const [welcomeName, setWelcomeName] = useState(user.name)
    const [isEditMode, setIsEditMode] = useState(false);
    const [error, setError] = useState('');
    const {enteredValues, errors, handleChange, isFormValid} = useForm({});

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const user = await onUpdateUser(enteredValues.name, enteredValues.email);
            console.log(user);
            if (user) {
                setWelcomeName(user.name);
            }
        } catch (e) {
            setError('Упс');
        }
    }

    const FormError = () => {
        return Object.keys(errors).map((key, index) => {
            return errors[key] ? <span key={index} className='profile__error' id='profile__error'>
                        {`${key}: ${errors[key]}`}
                    </span> : <></>
        })
    }

    return (
        <>
            <Header isLoginPanelVisible={!isLoggedIn}>
                <Navigation isMenuVisible={isLoggedIn}/>
            </Header>
            <main className='main'>
                <section className='section__block section__block_type_profile'>
                    <div className='profile__container'>
                        <h1 className='profile__title'>{`Привет, ${welcomeName || 'Пользователь'}!`}</h1>
                        <form className='form profile___form'
                              onSubmit={handleSubmit}
                              noValidate>
                            <div className='profile__field'>
                                <label className='profile__label'>Имя</label>
                                <input className='profile__input'
                                       type='text'
                                       name='name'
                                       id='name'
                                       placeholder='Имя'
                                       minLength='2'
                                       maxLength='40'
                                       value={enteredValues.name || ''}
                                       onChange={handleChange}
                                       required
                                       disabled={!isEditMode}
                                />
                            </div>
                            <div className='profile__field'>
                                <label className='profile__label'>E-mail</label>
                                <input className='profile__input'
                                       type='email'
                                       name='email'
                                       id='email'
                                       placeholder='Почта'
                                       value={enteredValues.email || ''}
                                       onChange={handleChange}
                                       required
                                       disabled={!isEditMode}
                                />
                            </div>
                        </form>
                    </div>
                    {!isEditMode && (<div className='profile__bottom'>
                        <button className='link profile__submit'
                                onClick={() => {
                                    setIsEditMode(true)
                                }}>Редактировать
                        </button>
                        <button className='link profile__logout'
                                onClick={onSignOut}
                        >
                            Выйти из аккаунта
                        </button>
                    </div>)}
                    {isEditMode && (<div className='profile__bottom'>
                        <FormError/>
                        {error && <span className='profile__error' id='profile__error'>
                        {error}
                    </span>}
                        <button className='profile__button'
                                type='submit'
                                onClick={handleSubmit}
                                disabled={!isFormValid}
                        >
                            Сохранить
                        </button>
                    </div>)}
                </section>
            </main>
        </>
    );
}

export default Profile;

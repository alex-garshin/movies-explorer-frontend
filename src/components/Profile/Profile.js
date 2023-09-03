import React, { useState, useContext, useEffect } from "react";

import "./Profile.css";

import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import useForm from "../../hooks/useForm";
import CurrentUserContext from "../../context/CurrentUserContext";
import Preloader from "../Preloader/Preloader";
import { updateError } from "../../utils/constants";

const Profile = ({ isLoggedIn, onUpdateUser, onSignOut, isLoading }) => {
  const currentUser = useContext(CurrentUserContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState("");
  const { enteredValues, errors, handleChange, isFormValid, resetForm } =
    useForm({});

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [resetForm, currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await onUpdateUser(enteredValues.name, enteredValues.email);
    } catch (e) {
      setError(updateError);
    } finally {
      setIsEditMode(false);
    }
  }

  const FormError = () => {
    return Object.keys(errors).map((key, index) => {
      return (
        errors[key] && (
          <span key={index} className="profile__error" id="profile__error">
            {`${key}: ${errors[key]}`}
          </span>
        )
      );
    });
  };

  return (
    <>
      <Header isLoginPanelVisible={!isLoggedIn}>
        <Navigation isMenuVisible={isLoggedIn} />
      </Header>
      <main className="main">
        <section className="section__block section__block_type_profile">
          <div className="profile__container">
            <h1 className="profile__title">{`Привет, ${
              currentUser.name || "Пользователь"
            }!`}</h1>
            <form
              className="form profile___form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="profile__field">
                <label className="profile__label">Имя</label>
                <input
                  className="profile__input"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Имя"
                  minLength="2"
                  maxLength="40"
                  value={enteredValues.name || ""}
                  onChange={handleChange}
                  required
                  disabled={!isEditMode}
                />
              </div>
              <div className="profile__field">
                <label className="profile__label">E-mail</label>
                <input
                  className="profile__input"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Почта"
                  value={enteredValues.email || ""}
                  onChange={handleChange}
                  required
                  disabled={!isEditMode}
                />
              </div>
            </form>
          </div>
          {isLoading && <Preloader />}
          {!isEditMode && (
            <div className="profile__bottom">
              <button
                className="link profile__submit"
                onClick={() => {
                  setIsEditMode(true);
                }}
              >
                Редактировать
              </button>
              <button className="link profile__logout" onClick={onSignOut}>
                Выйти из аккаунта
              </button>
            </div>
          )}
          {isEditMode && (
            <div className="profile__bottom">
              <FormError />
              {error && (
                <span className="profile__error" id="profile__error">
                  {error}
                </span>
              )}
              <button
                className="profile__button"
                type="submit"
                onClick={handleSubmit}
                disabled={!isFormValid}
              >
                Сохранить
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Profile;

import React from "react";
import { useNavigate } from "react-router-dom";

import "./Register.css";
import logo from "../../images/logo.svg";
import AuthForm from "../AuthForm/AuthForm";

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };

  const handleSubmit = (data) => {
    onRegister(data);
  };

  return (
    <main className="main">
      <section className="section__block section__block_type_register">
        <div className="register__container">
          <div className="register__wrapper">
            <div className="register__header">
              <img
                className="link register__logo"
                src={logo}
                alt="Логотип в форме кольца"
                onClick={navigateHome}
              />
            </div>
            <h1 className="register__title">Добро пожаловать!</h1>
            <AuthForm onSubmit={handleSubmit} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;

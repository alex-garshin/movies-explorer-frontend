import React from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import AuthForm from "../AuthForm/AuthForm";
import logo from "../../images/logo.svg";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };

  const handleSubmit = (data) => {
    onLogin(data);
  };

  return (
    <main className="main">
      <section className="section__block section__block_type_login">
        <div className="login__container">
          <div className="login__wrapper">
            <div className="login__header">
              <img
                className="link login__logo"
                src={logo}
                alt="Логотип в форме кольца"
                onClick={navigateHome}
              />
            </div>
            <h1 className="login__title">Рады видеть!</h1>
            <AuthForm onSubmit={handleSubmit} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;

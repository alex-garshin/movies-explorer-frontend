import React from "react";
import { HashLink as Link } from "react-router-hash-link";

import "./Promo.css";

import promoImage from "../../images/promo-logo.svg";

const Promo = () => {
  return (
    <section className="promo" id="promo">
      <div className="promo__container">
        <div className="promo__text-container">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <h2 className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </h2>
        </div>
        <img className="promo__image" src={promoImage} alt="Глобус" />
        <Link
          className="promo__button-more"
          to={{ pathname: "/", hash: "#about-project" }}
        >
          Узнать больше
        </Link>
      </div>
    </section>
  );
};

export default Promo;

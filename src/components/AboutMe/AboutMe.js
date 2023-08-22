import React from "react";

import photo from "../../images/photo.jpg";
import "./AboutMe.css";

const AboutMe = () => {
  const activity = {
    title: "Github",
    ref: "https://github.com/alex-garshin",
  };

  return (
    <section
      className="section__block section__block_type_about-me"
      id="about-me"
    >
      <div className="section__block-content">
        <h2 className="section__title section__title_type_about-me">Студент</h2>
        <div className="about-me__container">
          <div className="about-me__text-wrapper">
            <h3 className="about-me__name">Александр</h3>
            <p className="about-me__job">Фронтенд-разработчик, 27 лет</p>
            <p className="about-me__description">
              Я родился в г. Нижний Новгород в 1996 году. Закончил факультет
              "Институт Промышленных Технологий Машиностроения" в Нижегородском
              Государственном Техническом Университете. Я люблю слушать музыку,
              а ещё увлекаюсь бегом. Недавно начал кодить. С 2022 года работаю в
              сфере информационной безопасности. После того, как прошёл курс по
              веб-разработке, начал заниматься фриланс-заказами и ушёл с
              постоянной работы.
            </p>
            <a
              className="link about-me__link"
              href={activity.ref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {activity.title}
            </a>
          </div>
          <div className="about-me__photo-container">
            <img className="about-me__photo" src={photo} alt="Фото студента" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

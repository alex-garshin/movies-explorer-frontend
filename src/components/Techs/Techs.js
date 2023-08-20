import React from "react";

import "./Techs.css";

const Techs = () => {
  const techs = ["HTML", "CSS", "JS", "React", "Git", "Express.js", "mongoDB"];

  return (
    <section className="section__block section__block_type_techs">
      <h2 className="section__title section__title_type_techs">Технологии</h2>
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__description">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__items">
        {techs.map((tech, index) => (
          <li key={index} className="techs__item">
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Techs;

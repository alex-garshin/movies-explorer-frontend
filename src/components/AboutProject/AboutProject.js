import React from 'react';

import './AboutProject.css';

const AboutProject = () => {
    return (
        <section className='section__block section__block_type_about-project' id='about-project'>
            <h2 className='section__title section__title_type_about-project'>О проекте</h2>
            <ul className='about-project__cards'>
                <li className='about-project__card'>
                    <h3 className='about-project__card-title'>Дипломный проект включал 5 этапов</h3>
                    <p className='about-project__card-description'>Составление плана, работу над бэкендом, вёрстку,
                        добавление функциональности и финальные доработки.</p>
                </li>
                <li className='about-project__card'>
                    <h3 className='about-project__card-title'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about-project__card-description'>У каждого этапа был мягкий и жёсткий дедлайн, которые
                        нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <div className='about-project__timeline'>
                <p className='about-project__duration about-project__duration_backend'>1 неделя</p>
                <p className='about-project__duration about-project__duration_frontend'>4 недели</p>
                <p className='about-project__part-name'>Back-end</p>
                <p className='about-project__part-name'>Front-end</p>
            </div>
        </section>
    )
};

export default AboutProject;

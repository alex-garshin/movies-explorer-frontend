import React from 'react';

import './Footer.css';

const Footer = () => {
    const links = [
        {
            title: 'Яндекс.Практикум',
            ref: 'https://practicum.yandex.ru'
        },
        {
            title: 'Github',
            ref: 'https://github.com/alex-garshin'
        },
    ];
    const currentYear = new Date().getFullYear();

    return (
        <footer className='footer'>
            <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className='footer__wrapper'>
                <p className='footer__copyright'>&copy;&nbsp;{currentYear <= 2023 ? '2023' : `${currentYear}`}{' '}
                    Created by Alex_Garshin
                </p>
                <ul className='footer__links'>
                    {links.map((link, index) => (
                        <li key={index}>
                            <a className='link footer__link'
                               href={link.ref}
                               target='_blank'
                               rel='noopener noreferrer'>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </div>

        </footer>
    )
};

export default Footer;

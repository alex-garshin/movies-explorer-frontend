import React from 'react';

import { Link } from 'react-router-dom';

import './Page404.css';

const Page404 = () => {
    return (
        <section className='section__block section__block_type_page404'>
            <h1 className='page404__title'>404</h1>
            <p className='page404__subtitle'>Страница не найдена</p>
            <Link className='page404__link' to={-1}>
                Назад
            </Link>
        </section>
    );
}

export default Page404;

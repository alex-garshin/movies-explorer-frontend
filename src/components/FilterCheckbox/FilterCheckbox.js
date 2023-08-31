import React from 'react';

import './FilterCheckbox.css';

const FilterCheckbox = () => {
    return (
        <label className='filter__checkbox'>
            
            <input
                type='checkbox'
                className='filter__checkbox-default'
            />
            <span className='filter__checkbox-button'/>
            <span className='filter__checkbox-name'>Короткометражки</span>
        </label>
    );
}

export default FilterCheckbox;


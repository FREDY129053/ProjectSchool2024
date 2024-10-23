import React from 'react';
import './logo.css';
import { logoPath } from '../../../../constants/images';

function Logo() {
    return (
        <div className='Logo'>
            <a href="/">
                <img src={logoPath} alt="Vl.ru афиша" className="logo-img" />
            </a>
        </div>
    );
}

export { Logo };
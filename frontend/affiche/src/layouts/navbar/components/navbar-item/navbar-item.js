import React from 'react';
import './navbar-item.css';
import { categoryIcons } from '../../../../constants/images';

function NavbarItem({ itemName }) {
    return (
        <div className='NavbarItem'>
            <a className="nav-block nav-link" href="#">
                <img src={categoryIcons[0]} alt="icon" className="nav-item-icon" />
                <div className="nav-content-title">
                    {itemName}
                </div>
            </a>
        </div>
    );
}

/*

    Временно захардкодил src иконки категории на одну и ту же

*/

export { NavbarItem };
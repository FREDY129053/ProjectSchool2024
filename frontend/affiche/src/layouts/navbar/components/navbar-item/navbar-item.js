import React from 'react';
import './navbar-item.css';
import { categoryIcons } from '../../../../constants/images';

function NavbarItem({ itemName, itemSrc }) {
    return (
        <div className='NavbarItem'>
            <a className="nav-block nav-link" href="#">
                <img src={itemSrc} alt="icon" className="nav-item-icon" />
                <div className="nav-content-title">
                    {itemName}
                </div>
            </a>
        </div>
    );
}

export { NavbarItem };
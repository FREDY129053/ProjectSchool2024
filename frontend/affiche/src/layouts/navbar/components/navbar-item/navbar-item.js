import React from 'react';
import './navbar-item.css';

function NavbarItem({ itemName }) {
    return (
        <div className='NavbarItem'>
            {itemName}
        </div>
    );
}

export { NavbarItem };
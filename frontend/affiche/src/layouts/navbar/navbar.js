import React from 'react';
import './navbar.css';
import { NavbarItem } from './components/navbar-item/';


function Navbar({ items }) {
    return (
        <div className='Navbar wrapper'>
            {items.map(itemName => (
                <NavbarItem
                    itemName={itemName}
                />
            ))}
        </div>
    );
}

// если мы не будем делать карусельку, то надо будет 
// добавить подтип для NavbarItem в виде выпадающего списка

export { Navbar };
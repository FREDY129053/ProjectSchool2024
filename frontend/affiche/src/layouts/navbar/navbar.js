import React from 'react';
import './navbar.css';
import { NavbarItem } from './components/navbar-item/';


function Navbar({ items }) {
    const itemsToShow = items.slice(0, items.findIndex(item => item === 'Музеи и галлереи'));
    
    return (
        <div className='Navbar'>
            {itemsToShow.map((itemName, index) => (
                <NavbarItem
                    itemName={itemName}
                    key={index}
                />
            ))}
            <NavbarItem
                itemName={"еще"}
                key={itemsToShow.length}
            />
        </div>
    );
}

// если мы не будем делать карусельку, то надо будет 
// добавить подтип для NavbarItem в виде выпадающего списка

export { Navbar };
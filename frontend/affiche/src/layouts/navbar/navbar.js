import React from 'react';
import './navbar.css';
import { NavbarItem } from './components/navbar-item/';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';

function Navbar({ items }) {
    
    return (
        <div className='Navbar'>
            <ScrollingCarousel className='NavbarCarousel'>
                <div className='IndentLeft'></div>
                {items.map((itemName, index) => (
                <NavbarItem
                    itemName={itemName}
                    key={index}
                />
                ))}
                <div className='IndentRight'></div>
            </ScrollingCarousel>
            
        </div>
    );
}

// если мы не будем делать карусельку, то надо будет 
// добавить подтип для NavbarItem в виде выпадающего списка

export { Navbar };
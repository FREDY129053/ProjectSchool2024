import React from 'react';
import './navbar.css';
import { NavbarItem } from './components/navbar-item/';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';

function Navbar({ items }) {
    const itemsToShow = items.slice(0, items.findIndex(item => item === 'Обучение'));
    
    return (
        <div className='Navbar'>
            <ScrollingCarousel className='NavbarCarousel'>
                <div className='IndentLeft'></div>
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
                <div className='IndentRight'></div>
            </ScrollingCarousel>
            
        </div>
    );
}

// если мы не будем делать карусельку, то надо будет 
// добавить подтип для NavbarItem в виде выпадающего списка

export { Navbar };
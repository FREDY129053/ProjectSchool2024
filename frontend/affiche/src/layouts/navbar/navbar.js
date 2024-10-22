import React from 'react';
import './navbar.css';
import { NavbarItem } from './components/navbar-item/';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import { categoryIcons } from '../../constants/images';

function Navbar({ items }) {
    
    return (
        <div className='Navbar'>
            <ScrollingCarousel className='NavbarCarousel'>
                <div className='Indent'></div>
                {items.map((itemName, index) => (
                <NavbarItem
                    itemName={itemName}
                    itemSrc={categoryIcons[index]}
                    key={index}
                />
                ))}
                <div className='Indent'></div>
            </ScrollingCarousel>
            
        </div>
    );
}

export { Navbar };
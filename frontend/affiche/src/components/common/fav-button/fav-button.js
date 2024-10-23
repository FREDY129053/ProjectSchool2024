import React, { useState, useRef } from 'react';
import './fav-button.css';
import { ReactComponent as FavIcon } from '../../../assets/fav.svg';

function FavButton({ active=false, style }) {
    const [isActive, setIsActive] = useState(active);
    const favRef = useRef(null);

    function handleClick() {
        setIsActive(!isActive);
    };

    return (
        <div 
            className={`FavButton ${isActive ? 'FavActive' : ''}`}
            style={style}
            ref={favRef}
            onClick={handleClick}
        >
            <FavIcon
                className='FavIcon'
            />
        </div>
    );
}

export { FavButton };
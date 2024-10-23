import React, { useState } from 'react';
import './big-button.css';

const defaultButtonStyle = {
    backgroundColor: '#e88652',
    hoverBackgroundColor: '#fc9e6c', 
};

function BigButton({ text, icon, style=defaultButtonStyle, onClick }) {
    const [isHover, setIsHover] = useState(null);

    const hoverStyle = {
        backgroundColor: style.hoverBackgroundColor,
    };

    function handleMouseOver() {
        setIsHover(true);
    }

    function handleMouseLeave() {
        setIsHover(false);
    }

    return (
        <div 
            className='big-button'
            style={isHover ? { ...style, ...hoverStyle } : style}
            onClick={onClick}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >
            <img 
                src={icon}
            />
            <div>
                {text}
            </div>
        </div>
    )
}

export { BigButton };
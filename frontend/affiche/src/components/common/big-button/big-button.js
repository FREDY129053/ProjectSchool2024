import React from 'react';
import './big-button.css';

function BigButton({ text, icon, style, onClick }) {
    return (
        <div 
            className='big-button'
            style={style}
            onClick={onClick}
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
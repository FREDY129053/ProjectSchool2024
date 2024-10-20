import React from 'react';
import './big-button.css';

function BigButton({ text, icon, style }) {
    return (
        <div 
            className='big-button'
            style={style}
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
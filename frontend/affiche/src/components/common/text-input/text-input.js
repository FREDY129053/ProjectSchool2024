import React from 'react';
import './text-input.css';
import hideIcon from '../../../assets/icons/hide.svg';

function TextInput({ title, showVisibilitySwitch=false }) {
    return (
        <div className='TextInput'>
            <div className='Line'>
                {(title) && ( 
                    <div className='InputLabel'>
                        {title}
                    </div>   
                )}
                {(showVisibilitySwitch) && ( 
                    <div className='VisibilitySwitch'>
                        <img 
                            src={hideIcon}
                            className='HideIcon'
                        />
                        Спрятать
                    </div>   
                )}
            </div>
            <input 
                className='InputLine'
                type='text'
            />
        </div>
    );
}

export { TextInput };
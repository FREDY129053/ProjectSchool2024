import React from 'react';
import './user-controls.css';
import { likeInactive } from '../../../../constants/images';

function UserControls() {
    return (
        <div className='UserControls'>
            <li className="nav-item">
                <button className="link-body-emphasis favorite-btn">
                    <img src={likeInactive} className="favorite-btn-img" alt="" />
                </button>
                </li>
            <li className="nav-item">
                <button className="link-body-emphasis login-btn">
                    <div className="login-btn-text">
                            Войти
                    </div>
                </button>
            </li>
        </div>
    );
}

export { UserControls };
import React from 'react';
import './user-controls.css';
import { likeInactive } from '../../../../constants/images';
import { useNavigate } from "react-router-dom";

function UserControls() {

    let navigate = useNavigate();

    const routeAuth = () => { 
        let path = "/auth"
        navigate(path);
    }
    const routeFavorite = () => { 
        let path = "/favorite"
        navigate(path);
    }

    return (
        <div className='UserControls'>
            <li className="nav-item">
                <button className="link-body-emphasis favorite-btn">
                    <img src={likeInactive} className="favorite-btn-img" onClick={routeFavorite} />
                </button>
            </li>
            <li className="nav-item">
                <button className="link-body-emphasis login-btn" onClick={routeAuth}>
                    <div className="login-btn-text">
                            Войти
                    </div>
                </button>
            </li>
        </div>
    );
}

export { UserControls };
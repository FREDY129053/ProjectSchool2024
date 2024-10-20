import React from 'react';
import './banner.css';

function Banner({bgImg, title}) {
    return (
        <div className="banner">
            <div className="banner-shadow"></div>
            <img src={bgImg} className="banner-bg" />
            <h3 className="banner-title">
                {title}
            </h3>
        </div>
    )
}

export { Banner };
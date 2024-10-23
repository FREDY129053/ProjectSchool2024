import React from "react";
import './active-filter.css';

function ActiveFilter({title}) {
    return (
        <div className="event-catalog-active-filter">
                <div className="event-catalog-active-filter-title">
                    {title}
                </div>
            <img className="event-catalog-active-icon" src="/assets/icons/cross.svg"></img>
        </div>
    )
}

export {ActiveFilter};
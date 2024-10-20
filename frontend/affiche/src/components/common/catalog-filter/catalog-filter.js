import React from "react";

function CatalogFilter({text, icon}) {
    return (
        <div className="event-catalog-filter">
            {text}
            <img className="event-catalog-icon" src={icon}></img>
        </div>
    )
}

export {CatalogFilter};
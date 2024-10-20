import React from "react";
import './big-button.css';

function BigButton({text}) {
    return (
        <div className="big-button">
            {text}
        </div>
    )
}

export { BigButton };
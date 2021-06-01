import React from 'react';
import MouseTooltip from 'react-sticky-mouse-tooltip';
import Flag from "react-world-flags";
import './worldMap.css';

function CountryTooltip(props) {
    return (
        <MouseTooltip
            visible={props.visible}
            offsetX={15}
            offsetY={10}
        >
            <div className="country-tooltip">
                <Flag code={props.code} height="45" fallback={<span>Unknown</span>} style={{border : "1px solid black"}}/>
                <p>{props.text}</p>
            </div>
        </MouseTooltip>
    );
}

export default CountryTooltip;
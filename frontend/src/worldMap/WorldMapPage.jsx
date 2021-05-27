import React, {useState} from 'react';
import WorldMap from "./WorldMap";
import CountrySearchHome from "./CountrySearchHome";
import logoTripTipsBlanc from "../images/logoTripsTipsBlanc.png";
import './worldMap.css';

function WorldMapPage(props) {
    return (
        <div>
            <img src={logoTripTipsBlanc} width='300px' className="trip-tip-logo"/>
            <div className="map-container">
                <WorldMap width={"75%"}/>
            </div>
            <CountrySearchHome/>
        </div>
    );
}

export default WorldMapPage;

import React from 'react';
import logoTripTipsBlanc from "../images/logoTripsTipsBlanc.png";
import "./styleIndex.scss";

const Index = (props) => {
    return (
        <div className="container-index">
            <div className="container-index-2">
                <div className="logo">
                    <img alt="" src={logoTripTipsBlanc}/>
                </div>
                <h1>Welcome on Trip and Tips !</h1>
            </div>
        </div>
    )
}

export default Index
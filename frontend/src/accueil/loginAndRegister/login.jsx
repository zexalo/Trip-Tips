import React from "react";
import logoTripTips from "../../images/logoTripTips.png";

export class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="base-container" ref={this.props.containerRef}>
            <div className="logo">
                <img alt="" src={logoTripTips}></img>
            </div>
            <div className="header">Login</div>
            <div className="content">
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="e-mail" placeholder="email"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password"></input>
                    </div>
                </form>
            </div>
            <div className="footer"> 
                <button type="button" className="login-button">Login</button>
            </div>
        </div>

    }
}
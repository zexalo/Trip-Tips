import React from "react";
import "./styleLoginAndRegister.scss";
import { Register } from "./register";
import {Login} from "./login";


export class LoginAndRegisterContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoginActive: true,
        };
    }



    changeState() {
        const { isLoginActive } = this.state;
        if(isLoginActive) {
            this.blueSide.classList.remove("right");
            this.blueSide.classList.add("left");
        }
        else{
            this.blueSide.classList.remove("left");
            this.blueSide.classList.add("right");
        }

        this.setState(prevState => ({ isLoginActive: !prevState.isLoginActive }) )
    }

    render() {
        const { isLoginActive } = this.state;
        const current = isLoginActive ? "Register" : "Login";

        return (
            <div className="modalWindow" onKeyDown={this.props.handleKeyDown} tabIndex={0} onClick={this.props.hideModalWindow}
            style = {{
                display: this.props.isModalVisible ? "flex" : "none"
            }}
            >
                <div className="carouselLoginAndRegister" onClick={(e) => e.stopPropagation()}>
                    <div className="containerLoginOrRegister">
                        {isLoginActive && <Login containerRef={(ref) => this.current = ref} /> }
                        {!isLoginActive && <Register containerRef={(ref) => this.current = ref} /> }
                    </div>

                    <BlueSide current={current} containerRef={ref => this.blueSide = ref} onClick={this.changeState.bind(this)} />
                </div>
            </div>
        );
    }
}

export const BlueSide = props => {
    return <div className="blue-side right" ref={props.containerRef} onClick={props.onClick}>
            <div className="text">{props.current}</div>
    </div>
};

export { Login } from "./login";
export { Register } from "./register";

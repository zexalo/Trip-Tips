import React from "react";
import "./styleLoginAndRegister.scss";
import { LoginAndRegisterContainer } from "./loginAndRegisterContainer";


export class LoginAndRegisterButton extends React.Component {
    state = {
        isModalVisible: false
    }

    showModalWindow = () => {
        this.setState({
            isModalVisible: true
        })
    }

    hideModalWindow = () => {
        this.setState({
            isModalVisible: false
        })
    }

    handleKeyDown = (event) => {
        if(event.key === "Escape"){
            this.setState({
                isModalVisible: false
            })  
        }
    }

    render() {

        return(
            <div>
                <button onClick={this.showModalWindow} className="login-register-button">Login/Register</button>
                <LoginAndRegisterContainer 
                isModalVisible={this.state.isModalVisible}
                hideModalWindow={this.hideModalWindow}
                handleKeyDown={this.handleKeyDown}
                />
            </div>
        );
    }


}
import React from "react";
import logoTripTips from "../../images/logoTripTips.png";

export class EditMyProfil extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="editProfileMainContainer" 
        style = {{
            display: this.props.isEditProfileVisible ? "flex" : "none"
        }}
        onKeyDown={this.props.handleKeyDown} tabIndex={0} onClick={this.props.hideEditProfileWindow}
        >
        <div className="edit-my-profile-container" onClick={(e) => e.stopPropagation()}>
            <div className="crossButtonContainer"><button className="crossButton" onClick={this.props.hideEditProfileWindow}
            >X</button></div>
            <div className="header">Edit my profile</div>
            <div className="content">
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text" 
                            name="name" 
                            placeholder="full name"
                        >     
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Birth Date</label>
                        <input 
                            type="date" 
                            name="birthDate" 
                            placeholder="birth date"
                        >
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="email"
                        >
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="password"
                        >
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="confirm password"
                        ></input>
                    </div>
                    <div className="footer"> 
                        <button type="button" className="edit-button">Edit</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    }
}
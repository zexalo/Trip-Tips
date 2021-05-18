import React from "react";
import logoTripTips from "../../images/logoTripTips.png";


const formValid = ({ ...rest }) => {
    let valid = true;
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
};

export class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
        };
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value } );
    };

    
    handleSubmit = e => {
        e.preventDefault();
    
        if (formValid(this.state)) {
          console.log(`
            --SUBMITTING--
            Email: ${this.state.email}
            Password: ${this.state.password}
          `);
        } else {
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    };

    render() {
        return <div className="base-container" ref={this.props.containerRef}>
            <div className="logo">
                <img alt="" src={logoTripTips}></img>
            </div>
            <div className="header">Login</div>
            <div className="content">
                <form className="form" onSubmit={this.handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="email"
                            noValidate
                            onChange={this.handleChange}
                        ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="password"
                            noValidate
                            onChange={this.handleChange}
                        >
                        </input>
                    </div>
                    <div className="footer"> 
                        <button type="submit" className="login-button">Login</button>
                    </div>
                </form>
            </div>
            
        </div>

    }
}
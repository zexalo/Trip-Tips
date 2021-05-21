import React from "react";
import logoTripTips from "../../images/logoTripTips.png";
import { AuthService } from "../../services/AuthService";


const formValid = ({ ...rest }) => {
    let valid = true;
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      (val === null || val==="") && (valid = false);
    });
  
    return valid;
};

const { dispatch } = React.useContext(AuthContext);

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

          AuthService.login(this.state.email, this.state.password).then((response) => {
              if (response.status === 200){
                  dispatch({ type: 'login', jwt: response.data.id_token})
              } else if (response.response.status === 401) {
                  console.error("Identifiants invalides");
              }

          })
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
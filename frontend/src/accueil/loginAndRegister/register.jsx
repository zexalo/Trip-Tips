import React from "react";
import logoTripTips from "../../images/logoTripTips.png";
import AuthService from "../../services/AuthService";


const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

const passwordRegex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        (val === null || val==="") && (valid = false);
    });

    return valid;
};


export class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            email: null,
            password: null,
            confirmPassword: null,
            formErrors: {
              name: "",
              email: "",
              password: "",
              confirmPassword: ""
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
          console.log(`
            --SUBMITTING--
            Name: ${this.state.name}
            Email: ${this.state.email}
            Password: ${this.state.password}
            Confirm Password: ${this.state.confirmPassword}
          `);

            AuthService.register(this.state.name, this.state.email, this.state.password).then((response) => {
                if (response.status === 201) {
                    console.error("Compte créé avec succès!");
                    //navigate
                } else if (response.response.status === 500) {
                    console.error("Cette adresse mail est déjà utilisée");
                }
            }).catch((error) => {
                console.error("Une erreur est survenue");
            })
        } else {
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }

    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
          case "name":
            formErrors.name = value.length < 4 ? "minimum 4 characaters required" : "";
            break;
          case "email":
            formErrors.email = emailRegex.test(value) ? "" : "invalid email address";
            break;
          case "password":
            formErrors.password = passwordRegex.test(value) ? "" : "your password must be stronger";
            break;
          case "confirmPassword":
            formErrors.confirmPassword = value===this.state.password ? "" : "passwords must match";
            break;
          default:
            break;
        }

            this.setState({ formErrors, [name]: value } );
    };

    render() {
        const { formErrors } = this.state;

        return <div className="base-container" ref={this.props.containerRef}>
            <div className="logo">
                <img alt="" src={logoTripTips}></img>
            </div>
            <div className="header">Register</div>
            <div className="content">
                <form className="form" onSubmit={this.handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            className={formErrors.name.length > 0 ? "error" : null}
                            type="text"
                            name="name"
                            placeholder="full name"
                            noValidate
                            onChange={this.handleChange}
                        >
                        </input>
                        {formErrors.name.length > 0 && (
                            <span className="errorMessage">{formErrors.name}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            className={formErrors.email.length > 0 ? "error" : null}
                            type="email"
                            name="email"
                            placeholder="email"
                            noValidate
                            onChange={this.handleChange}
                        >
                        </input>
                        {formErrors.email.length > 0 && (
                            <span className="errorMessage">{formErrors.email}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            className={formErrors.password.length > 0 ? "error" : null}
                            type="password"
                            name="password"
                            placeholder="password"
                            noValidate
                            onChange={this.handleChange}
                        >
                        </input>
                        {formErrors.password.length > 0 && (
                            <span className="errorMessage">{formErrors.password}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="confirm password"
                            noValidate
                            onChange={this.handleChange}
                        ></input>
                        {formErrors.confirmPassword.length > 0 && (
                            <span className="errorMessage">{formErrors.confirmPassword}</span>
                        )}
                    </div>
                    <div className="footer">
                        <button type="submit" className="login-button">Register</button>
                    </div>
                </form>
            </div>

        </div>
    }
}

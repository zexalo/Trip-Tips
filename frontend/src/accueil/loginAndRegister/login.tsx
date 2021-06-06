import React, {useContext, useState} from "react";
import logoTripTips from "../../images/logoTripTips.png";
import {Formik, FormikValues} from "formik";
import {AuthActionType} from "../../models/Auth";
import {User} from "../../models/User";
import {AuthContext} from "../../contexts/AuthContext";
import {HTTPRequestError} from "../../services/ApiService";
import AuthService from "../../services/AuthService";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

type LoginFormValues = {
    email: string,
    password: string
}

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Adresse mail invalide').required('Champs requis'),
    password: Yup.string().required("Mot de passe invalide")
})

export const Login: React.FC = () => {

    const {dispatch} = useContext(AuthContext);

    const [isLoading, setLoading] = useState<boolean>(false);

    let history = useHistory();


    const handleLogin = (values: FormikValues) => {
        console.log(values);
        AuthService.login(values.email, values.password)(dispatch).then(p => {
            const error = p as HTTPRequestError;
            const user = p as User;
            if (error.message) {
                handleLoginError(error);
            } else {
                dispatch({type: AuthActionType.GET_LOGGED_USER, payload: user});
                history.push('/home')
            }
        }).catch((e: HTTPRequestError) => {
            handleLoginError(e);
            setLoading(false);
        });
    };

    const handleLoginError = (error: HTTPRequestError) => {
        setLoading(false);
        console.log(error);
    };


    const initialValues: LoginFormValues = {
        email: '',
        password: ''
    };

        return (
            <div className="base-container">
                <div className="logo">
                    <img alt="" src={logoTripTips}/>
                </div>
                <div className="header">Login</div>
                <div className="content">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => {
                            handleLogin(values)
                        }}
                        validationSchema={loginSchema}
                    >{({handleChange, handleSubmit, values, errors, touched}) => (
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="email"
                                    onChange={handleChange('email')}
                                    value={values.email}
                                />
                                {errors.email && touched.email ?(<div className="errorText">{errors.email}</div>) : null}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    onChange={handleChange('password')}
                                    value={values.password}
                                >
                                </input>
                                {errors.password && touched.password ?(<div className="errorText">{errors.password}</div>) : null}
                            </div>
                            

                            <div className="footer">
                                <button type="submit" className="login-button" onClick={() => handleSubmit()}>
                                    Login
                                </button>
                            </div>

                        </div>
                    )}

                    </Formik>
                </div>
            </div>
        )
}


import React, {useContext, useState} from "react";
import logoTripTips from "../../images/logoTripTips.png";
import {Formik, FormikValues} from "formik";
import {AuthAction, AuthActionType} from "../../models/Auth";
import {User} from "../../models/User";
import {AuthContext} from "../../contexts/AuthContext";
import {HTTPRequestError} from "../../services/ApiService";
import AuthService from "../../services/AuthService";
import * as Yup from "yup";

type LoginFormValues = {
    email: string,
    password: string
}

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Adresse mail invalide').required('Champs requis'),
    password: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').matches(/^((?=.*[a-z])(?=.*[A-Z])(?=.*\d))[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, 'Le mot de passe doit contenir au moins 8 caractères, une minuscule et une majuscule'),
})

export const Login: React.FC = () => {

    const {state, dispatch} = useContext(AuthContext);

    const [isLoading, setLoading] = useState<boolean>(false);

    const handleLogin = (values: FormikValues) => {
        AuthService.login(values.email, values.password)(dispatch).then(p => {
            const error = p as HTTPRequestError;
            const user = p as User;
            if (error.message) {
                handleLoginError(error);
            } else {
                console.log("vhjsbvh", state.token);
                dispatch({type: AuthActionType.GET_LOGGED_USER, payload: user});
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
                        <div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    onChange={handleChange('email')}
                                    value={values.email}
                                />
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
                            </div>
                            <button onClick={() => handleLogin(values)}>
                                Login
                            </button>
                        </div>
                    )}
                    </Formik>
                </div>
            </div>
        )
}


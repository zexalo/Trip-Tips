import React, {useContext, useState} from "react";
import logoTripTips from "../../images/logoTripTips.png";
import AuthService from "../../services/AuthService";
import * as Yup from "yup";
import { AuthContext } from "../../contexts/AuthContext";
import { ErrorMessage, Formik, FormikValues } from "formik";
import { HTTPRequestError } from "../../services/ApiService";
import { User } from "../../models/User";
import { AuthActionType } from "../../models/Auth";
import { useHistory } from "react-router-dom";


type registerFormValues = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    langKey:string,

}

const registerSchema = Yup.object().shape({
    firstName: Yup.string().required('Champs requis'),
    lastName: Yup.string().required('Champs requis'),
    email: Yup.string().email('Adresse mail invalide').required('Champs requis'),
    password: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').matches(/^((?=.*[a-z])(?=.*[A-Z])(?=.*\d))[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, 'Le mot de passe doit contenir au moins 8 caractères, une minuscule et une majuscule'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre'),
})

export const Register: React.FC = () => {

    const {dispatch} = useContext(AuthContext);
    const [isLoading, setLoading] = useState<boolean>(false);
    let history = useHistory();
    
    const handleRegister = (values: FormikValues) => {
        console.log(values);
        
        AuthService.register(values.email, values.password,values.firstName,values.lastName).then(p => {
            history.push('/home')
            
        }).catch((e: HTTPRequestError) => {
            handleRegisterError(e);
            setLoading(false);
        });

    };

    const handleRegisterError = (error: HTTPRequestError) => {
        setLoading(false);
        console.log(error);
    };


    const initialValues: registerFormValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        langKey: "fr",
    
    } 

        return (
            <div className="base-container">
                <div className="logo">
                    <img alt="" src={logoTripTips}/>
                </div>
                <div className="header">Register</div>
                <div className="content">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={registerSchema}
                        onSubmit={(values) => {
                            handleRegister(values)
                        }}
                        
                    >{({handleChange, handleSubmit, values, errors, touched}) => (
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="firstName"
                                    name="firstName"
                                    placeholder="firstName"
                                    onChange={handleChange('firstName')}
                                    value={values.firstName}
                                >
                                </input>
                            </div>
                            {errors.firstName && touched.firstName ?(<div>{errors.firstName}</div>) : null}
                          
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="lastName"
                                    name="lastName"
                                    placeholder="lastName"
                                    onChange={handleChange('lastName')}
                                    value={values.lastName}
                                >
                                </input>
                            </div>
                            {errors.lastName && touched.lastName ?(<div>{errors.lastName}</div>) : null}
                        
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
                            {errors.email && touched.email ?(<div>{errors.email}</div>) : null}
                           
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
                            {errors.password && touched.password ?(<div>{errors.password}</div>) : null}
                            
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="confirmPassword"
                                    onChange={handleChange('confirmPassword')}
                                    value={values.confirmPassword}
                                >
                                </input>
                            </div>
                            {errors.confirmPassword && touched.confirmPassword ?(<div>{errors.confirmPassword}</div>) : null}
                    
                
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





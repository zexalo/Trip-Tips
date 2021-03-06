import React, {useContext, useState} from "react";
import logoTripTips from "../../images/logoTripTips.png";
import AuthService from "../../services/AuthService";
import * as Yup from "yup";
import { AuthContext } from "../../contexts/AuthContext";
import { ErrorMessage, Field, Formik, FormikValues } from "formik";
import { HTTPRequestError } from "../../services/ApiService";
import { User } from "../../models/User";
import { AuthActionType } from "../../models/Auth";
import { useHistory } from "react-router-dom";
import { validateLocaleAndSetLanguage } from "typescript";
import Modal from "../../reusables/modal";


type registerFormValues = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    langKey:string,
    authorities : [string],
  

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
    const [open, setOpen] = React.useState(false);
    
    const handleRegister = (values: FormikValues) => {
        console.log(values);
        
        AuthService.register(values.email, values.password,values.firstName,values.lastName,values.authorities).then(p => {
            alert("Inscription réussi ! Vous pouvez maintenant vous connecter.")
            history.go(0)
            
        }).catch((e: HTTPRequestError) => {
            handleRegisterError(e);
            setLoading(false);
        });
    };

    const handleRegisterError = (error: HTTPRequestError) => {
        setLoading(false);
        console.log(error);
        setOpen(true);
        setTimeout(function () {
            setOpen(false);
        }, 4000)
    };


    const initialValues: registerFormValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        langKey: "fr",
        authorities: [""],
     
    
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
                                    type="text"
                                    name="firstName"
                                    placeholder="firstName"
                                    onChange={handleChange('firstName')}
                                    value={values.firstName}
                                >
                                </input>
                            </div>
                            {errors.firstName && touched.firstName ?(<div className="errorText">{errors.firstName}</div>) : null}
                          
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="lastName"
                                    onChange={handleChange('lastName')}
                                    value={values.lastName}
                                >
                                </input>
                            </div>
                            {errors.lastName && touched.lastName ?(<div className="errorText">{errors.lastName}</div>) : null}
                        
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="email"
                                    onChange={handleChange('email')}
                                    value={values.email}
                                />
                             
                            </div>
                            {errors.email && touched.email ?(<div className="errorText">{errors.email}</div>) : null}
                           
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
                            {errors.password && touched.password ?(<div className="errorText">{errors.password}</div>) : null}
                            
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
                            {errors.confirmPassword && touched.confirmPassword ?(<div className="errorText">{errors.confirmPassword}</div>) : null}
                            <div className="form-group-inline">
                                <Field className="form-check-input" 
                                type="radio" 
                                name="authorities[0]" 
                                value="ROLE_USER"
                               
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault1" >
                                    Traveler
                                </label>
                                <Field className="form-check-input ml-4" 
                                type="radio" 
                                name="authorities[0]" 
                                value="ROLE_OWNER"
                                
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Owner
                                </label>
                            </div>
                            <div className="footer">
                                <button type="submit"className="login-button" onClick={() => handleSubmit()}>
                                    Login
                                </button>
                            </div>
                            
                            
                            
                        </div>
                    )}

                    </Formik>
                </div>
                { open && <Modal title={"Error"} content={"Register failed"}/>}
            </div>
        )
}





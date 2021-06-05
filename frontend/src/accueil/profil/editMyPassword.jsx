import React, { useContext, useState } from "react";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../contexts/AuthContext";
import * as Yup from "yup";
import { ErrorMessage, Formik, FormikValues } from "formik";
import ApiService from "../../services/ApiService";
import { useHistory } from "react-router-dom";

const EditPasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').matches(/^((?=.*[a-z])(?=.*[A-Z])(?=.*\d))[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, 'Le mot de passe doit contenir au moins 8 caractères, une minuscule et une majuscule'),
    newPassword: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').matches(/^((?=.*[a-z])(?=.*[A-Z])(?=.*\d))[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, 'Le mot de passe doit contenir au moins 8 caractères, une minuscule et une majuscule'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Les mots de passe doivent correspondre'),
})

export default function EditMyPassword(props) {

    const { state, dispatch } = useContext(AuthContext);
    let history = useHistory();

    const handleEditPassword = async (values) => {
        
        const valuesToSend = {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword
        }

        /*
        console.log(valuesToSend);
        console.log(state);
        */
       
        await ApiService.post('/account/change-password', valuesToSend, state)
            .then(() => {
                AuthService.logout()(dispatch).then(() => {history.push('/home')})
            })
            .catch((e) => {
                console.log(e);
            });

    };

    const handleEditPasswordError = (error) => {
        console.log(error);
    };

    const initialValues = {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    }

    return (

        <div className="editProfileMainContainer"
            style={{
                display: props.isEditPasswordVisible ? "flex" : "none"
            }}
            tabIndex={0}
            onClick={props.hideEditPasswordWindow}
        >
            <div className="edit-my-profile-container" onClick={(e) => e.stopPropagation()}>
                <div className="crossButtonContainer"><button className="crossButton" onClick={props.hideEditPasswordWindow}
                >X</button></div>
                <div className="header">Edit my password</div>
                <div className="content">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={EditPasswordSchema}
                        onSubmit={(values) => {
                            handleEditPassword(values)
                        }}

                    >{({ handleChange, handleSubmit, values, errors, touched }) => (
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="currentPassword">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    placeholder="current password"
                                    onChange={handleChange('currentPassword')}
                                    value={values.currentPassword}
                                >
                                </input>
                                {errors.currentPassword && touched.currentPassword ? (<div className="errorText">{errors.currentPassword}</div>) : null}
                            </div>

                            <div className="form-group">
                                <label htmlFor="newPassword">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="new password"
                                    onChange={handleChange('newPassword')}
                                    value={values.newPassword}
                                >
                                </input>
                                {errors.newPassword && touched.newPassword ? (<div className="errorText">{errors.newPassword}</div>) : null}
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmNewPasswords"
                                    placeholder="confirm new password"
                                    onChange={handleChange('confirmNewPassword')}
                                    value={values.confirmNewPassword}
                                />
                                {errors.confirmNewPassword && touched.confirmNewPassword ? (<div className="errorText">{errors.confirmNewPassword}</div>) : null}
                            </div>
                            <div className="footer">
                                <button type="submit" className="edit-button" onClick={() => handleSubmit()}>Modify Password</button>
                            </div>

                        </div>
                    )}
                    </Formik>
                </div>
            </div>
        </div>
    )

}
import React, { useContext, useState } from "react";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../contexts/AuthContext";
import * as Yup from "yup";
import { ErrorMessage, Formik, FormikValues } from "formik";
import ApiService from "../../services/ApiService";
import { useHistory } from "react-router-dom";

const EditProfileSchema = Yup.object().shape({
    firstName: Yup.string().required('Champs requis'),
    lastName: Yup.string().required('Champs requis'),
    email: Yup.string().email('Adresse mail invalide').required('Champs requis'),
})

export default function EditMyProfil(props) {

    const { state, dispatch } = useContext(AuthContext);
    let history = useHistory();

    const handleEditProfile = async (values) => {
        console.log(values);

        await ApiService.post('/account', values, state)
            .then(() => {
                AuthService.logout()(dispatch).then(() => {history.push('/home')})
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleEditProfileError = (error) => {
        console.log(error);
    };

    const initialValues = {
        firstName: state.user?.firstName,
        lastName: state.user?.lastName,
        email: state.user?.email,
        langkey: "fr",
        login: state.user?.email,
    }

    return (

        <div className="editProfileMainContainer"
            style={{
                display: props.isEditProfileVisible ? "flex" : "none"
            }}
            tabIndex={0}
            onClick={props.hideEditProfileWindow}
        >
            <div className="edit-my-profile-container" onClick={(e) => e.stopPropagation()}>
                <div className="crossButtonContainer"><button className="crossButton" onClick={props.hideEditProfileWindow}
                >X</button></div>
                <div className="header">Edit my profile</div>
                <div className="content">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={EditProfileSchema}
                        onSubmit={(values) => {
                            handleEditProfile(values)
                        }}

                    >{({ handleChange, handleSubmit, values, errors, touched }) => (
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="firstName">First name</label>
                                <input
                                    type="firstName"
                                    name="firstName"
                                    placeholder="firstName"
                                    onChange={handleChange('firstName')}
                                    value={values.firstName}
                                >
                                </input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last name</label>
                                <input
                                    type="lastName"
                                    name="lastName"
                                    placeholder="lastName"
                                    onChange={handleChange('lastName')}
                                    value={values.lastName}
                                >
                                </input>
                            </div>
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
                            <div className="footer">
                                <button type="submit" className="edit-button" onClick={() => handleSubmit()}>Edit</button>
                            </div>
                        </div>
                    )}
                    </Formik>
                </div>
            </div>
        </div>
    )

}
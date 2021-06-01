import React, {useContext, useEffect, useState} from "react";
import logoTripTips from "../images/logoTripTips.png";
import AuthService from "../services/AuthService";
import * as Yup from "yup";
import { AuthContext } from "../contexts/AuthContext";
import { ErrorMessage, Formik, FormikValues } from "formik";
import ApiService, { HTTPRequestError } from "../services/ApiService";
import { User } from "../models/User";
import { AuthActionType } from "../models/Auth";
import { useHistory } from "react-router-dom";
import {Country} from '../models/Country'


type addRecoFormValues = {
    title: string,
    content: string,
    price: number,
    city: string,
    globalRating: number,
    category: {id: string},
    country: {id: string},
    

}

const addRecoSchema = Yup.object().shape({
    title: Yup.string().required('Champs requis'),
    content: Yup.string().required('Champs requis'),
    price: Yup.number().required('Un prix est néccessaire'),
    city: Yup.string().required('Entrer la ville'),
    globalRating: Yup.number().min(0).max(5).integer().required('Entrer une note valide entre 0 et 5'),

    
})

function Add_recommendation() {
    const {dispatch} = useContext(AuthContext);
    const {state} = useContext(AuthContext);
    const [isLoading, setLoading] = useState<boolean>(false);
    let history = useHistory();
    const [list, setList] = useState<Country[]>([]);
    

    

    const fetchCountries = async () => {
        await ApiService.get<Country[]>('/countries', state).then((data) =>  setList(data))
    }

    useEffect(()=>{
        fetchCountries()
            .then(() => (console.log(list)));

        
    },[])
       

    
    
    

    const postReccomandation = async (values: FormikValues) => {
        try {
            console.log(values)
            await ApiService.post('/recomendations', values,state)
                .catch((e: HTTPRequestError) => {
                    console.log(e);
                });
            alert("Recommendation bien recu !")
            history.push("/monProfil")
        } catch (e) {
            console.log('e', e)
        }

    }

    const handleRegisterError = (error: HTTPRequestError) => {
        setLoading(false);
        console.log(error);
    };


    const initialValues: addRecoFormValues = {
        title: '',
        content: '',
        price: 0.00,
        city: '',
        globalRating: 0,
        category: {id: "1"},
        country:{id: "1"},
    
    } 

    return (
        
        <div className="base-container">
                <div className="logo">
                    <img alt="" src={logoTripTips}/>
                </div>
                <div className="header">Add Recommendation</div>
                <div className="content">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={addRecoSchema}
                        onSubmit={(values) => {
                            postReccomandation(values)
                        }}
                        
                    >{({handleChange, handleSubmit, values, errors, touched}) => (
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="title"
                                    onChange={handleChange('title')}
                                    value={values.title}
                                >
                                </input>
                            </div>
                            {errors.title && touched.title ?(<div className="errorText">{errors.title}</div>) : null}
                          
                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <input
                                    type="text"
                                    name="content"
                                    placeholder="content"
                                    onChange={handleChange('content')}
                                    value={values.content}
                                >
                                </input>
                            </div>
                            {errors.content && touched.content ?(<div className="errorText">{errors.content}</div>) : null}
                        
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="price"
                                    onChange={handleChange('price')}
                                    value={values.price}
                                />
                            </div>
                            {errors.price && touched.price ?(<div className="errorText">{errors.price}</div>) : null}
                           
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="city"
                                    onChange={handleChange('city')}
                                    value={values.city}
                                >
                                </input>
                            </div>
                            {errors.city && touched.city ?(<div className="errorText">{errors.city}</div>) : null}
                            
                            <div className="form-group">
                                <label htmlFor="globalRating">Global Rating</label>
                                <input
                                    type="number"
                                    name="globalRating"
                                    placeholder="globalRating"
                                    onChange={handleChange('globalRating')}
                                    value={values.globalRating}
                                >
                                </input>
                            </div>
                            {errors.globalRating && touched.globalRating ?(<div className="errorText">{errors.globalRating}</div>) : null}

                            <div className="form-group">
                                <label htmlFor="country">Countries</label>
                                <select
                                   
                                    name="country"
                                    placeholder="country"
                                    onChange={handleChange('country.id')}
                                    value={values.country.id}
                                
                                >
                                   
                                    {(list || []).map(item => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}

                                </select>
                               
                            </div>
                            {errors.country && touched.country ?(<div className="errorText">{errors.country}</div>) : null}

                            <div className="form-group">
                                <label htmlFor="category">Catégories</label>
                                <select
                                   
                                    name="category"
                                    placeholder="category"
                                    onChange={handleChange('category.id')}
                                    value={values.category.id}
                                >
                                        <option value={1}>Logement</option>
                                        <option value={2}>Activités Touristiques</option>
                                        <option value={3}>Restauration</option>

                                </select>
                               
                            </div>
                            {errors.category && touched.category ?(<div className="errorText">{errors.category}</div>) : null}
                            
                
                            <div className="footer">
                                <button type="submit" className="login-button" onClick={() => handleSubmit()}>
                                    ADD
                                </button>
                            </div>
                            
                            
                        </div>
                    )}

                    </Formik>
                </div>
            </div>
    )
}

export default Add_recommendation

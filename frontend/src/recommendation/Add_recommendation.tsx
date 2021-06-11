import React, {useContext, useEffect, useState} from "react";
import logoTripTips from "../images/logoTripTips.png";
import * as Yup from "yup";
import { AuthContext } from "../contexts/AuthContext";
import { ErrorMessage, Formik, FormikValues } from "formik";
import ApiService, { HTTPRequestError } from "../services/ApiService";
import { useHistory } from "react-router-dom";
import {Country} from '../models/Country'


type addRecoFormValues = {
    title: string,
    content: string,
    price: number,
    city: string,
    globalRating: number,
    category: {id?: number},
    country: {name?: string},
}

const addRecoSchema = Yup.object().shape({
    title: Yup.string().required('Champs requis'),
    content: Yup.string().required('Champs requis'),
    price: Yup.number().required('Un prix est néccessaire'),
    city: Yup.string().required('Entrer la ville'),
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
            await ApiService.post('/owner-recomendations', values,state)
                .then(() => {
                    alert("Recommendation bien recu !")
                    history.push("/monProfil")
                })
                .catch((e: HTTPRequestError) => {
                    console.log(e);
                    alert(e)
                });
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
        category: {id: 1},
        country:{name: "France"},
    } 

    return (
        <div className="base-container-container">
        <div className="base-container-add-reco">
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
                                <label htmlFor="country">Countries</label>
                                <select
                                   
                                    name="country"
                                    placeholder="country"
                                    onChange={handleChange('country.name')}
                                    value={values.country.name}
                                
                                >
                                   
                                    {(list || []).map(item => (
                                        <option value={item.name}>{item.name}</option>
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
            </div>
    )
}

export default Add_recommendation

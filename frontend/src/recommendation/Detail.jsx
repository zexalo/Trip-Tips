import React, {useContext, useEffect, useState} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import ApiService, {HTTPRequestError} from "../services/ApiService";
import {AuthContext} from "../contexts/AuthContext";
import {Formik, FormikValues} from "formik";
import Review from "./Review";
import { useLocation } from 'react-router-dom';

import imageBatiment from "../images/recommandation/Batiment.jpg";

const useStyles = makeStyles({
    root: {
        width: '75%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '15px',
        flexDirection: 'column',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


const DetailRecomandation = (props) => {
    const classes = useStyles();
    const {state} = useContext(AuthContext);
    const [list, setList] = useState([]);

    const location = useLocation();
    const title = location?.state?.title;
    const content = location?.state?.content;
    const id= location?.state?.id;
    const [isInUserFavoriteLocal, setIsInUserFavoriteLocal] = useState(location?.state?.isInUserFavorite);
    const globalRating=  location?.state?.globalRating;
    const city= location?.state?.city;
    const country= location?.state?.country;
    const picture= location?.state?.picture;
    const price= location?.state?.price;

    useEffect(() => {
    }, [location,title, location?.state?.title])

    const toggleFavorite = (id) => {
        try{
            ApiService.put('/favorite/' + id, {}, state)
            setIsInUserFavoriteLocal(!isInUserFavoriteLocal)
        }
        catch (e) {
            console.log(e)
        }
    };


    const fetchReviews = async () => {
        try{
            await ApiService.get('/reviews?', state).then((data) => setList(data))
        }
        catch(e){
            console.log(e)
        }
    }

    const postReview = async (values) => {
        try {
            console.log(values)
            await ApiService.post('/reviews', values,state)
                .then(() => fetchReviews())
                .catch((e) => {
                    console.log(e);
                });
        } catch (e) {
            console.log('e', e)
        }
    }

    const initialValues = {
        content: "",
        rating: 0,
        recomendation: {
            id: 10
        },
        user: {
            id: 5
        },
        createdAt: "2021-05-24T12:55:58.355Z"
    };

    useEffect(() => {
        fetchReviews()
            .then(() => (console.log(list)));
    },[])

    const List = () => (
        <ul style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            {(list || []).map(item => (
                <Review writer={item.user.login} content={item.content} rating={item.rating} id={item.id}/>
            ))}
        </ul>
    );

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Card className={classes.root}>
                <div className="backgroundImageContainer">
                    <img alt="image fond" src={imageBatiment}></img>
                </div>
                <CardContent className="cardContent">
                    <div className="favoriteButtonContainer">
                        <button onClick={() => toggleFavorite(id)} className="favoriteButton">
                            <svg className={isInUserFavoriteLocal ? "isFavorite" : "isNotFavorite"} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24">
                                <path
                                    d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
                            </svg>
                        </button>
                    </div>
                    <h1>{title}</h1>
                    <div className="recommandationAllContentContainer">
                        <div className="leftContainer">
                            <div className="contentContainer">
                                <h3>Description</h3>
                                <p>{content}</p>
                            </div>  
                        </div>
                        <div className="rightContainer">
                            <h3>Informations</h3>
                            <div className="locationContainer">
                                <h4>Location :</h4>
                                <div className="countryContainer">
                                    <label>Country :</label>
                                    <div className="country">
                                    {(country!==null)?
                                            country?.name :           
                                            <div>erreur</div>
                                    }
                                    </div>
                                </div>
                                <div className="cityContainer">
                                    <label>City :</label>
                                    <div className="city">{city}</div>
                                </div>
                            </div>

                            <div className="pricesContainer">
                                <h4>Prices :</h4>
                                <div className="priceContainer">
                                    <label>Price :</label>
                                    <div className="price">
                                        {price}
                                    </div>
                                </div>
                            </div>

                            <div className="ratingsContainer">
                                <h4>Ratings :</h4>
                                <div className="globalRatings">
                                    <label>Global Rating :</label>
                                    <div className="stars">
                                        <svg className={globalRating>=1 ? "filledStar" : "unfilledStar"} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 25 25"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                                        <svg className={globalRating>=2 ? "filledStar" : "unfilledStar"} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 25 25"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                                        <svg className={globalRating>=3 ? "filledStar" : "unfilledStar"} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 25 25"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                                        <svg className={globalRating>=4 ? "filledStar" : "unfilledStar"} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 25 25"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                                        <svg className={globalRating>=5 ? "filledStar" : "unfilledStar"} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 25 25"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                                    </div>
                                </div>
                                
                            </div> 
                        </div>
                        
                    </div>
                    
                </CardContent>

                <div className="reviewsContainer">
                    <h2>Reviews</h2>
                    <List/>
            
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => {
                            postReview(values)
                        }}>{({handleChange, handleSubmit, values}) => (
                        <div className="addReviewContainer">
                            <h3>Add a review</h3>
                            
                            <input
                                type="textarea"
                                name="content"
                                placeholder="Commentaire"
                                onChange={handleChange('content')}
                                value={values.content}
                            />
                            
                            <Button className="buttonAddReview" onClick={() => postReview(values)} size="small">ADD REVIEW</Button>

                        </div>
                    )}
                    </Formik>
                </div>
            </Card>
        </div>

    );
};

export default DetailRecomandation;

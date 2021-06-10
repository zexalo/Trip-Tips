import React, {useContext, useEffect, useState} from 'react';
import ApiService from "../services/ApiService";
import {AuthContext} from "../contexts/AuthContext";
import { ErrorMessage, Field, Formik, FormikValues } from "formik";
import * as Yup from "yup";




const Review = (props) => {
    
    const {state} = useContext(AuthContext);
    const [listMessages, setListMessages] = useState([]);
    const [isMessageContainerVisible, setisMessageContainerVisible ] = useState(false);

    const initialValues = {
        content: '',
        createdAt: "2021-06-05T22:31:28.441Z",
        review: {id:props.id},
        user: {id:null},
    } 

    const messageSchema = Yup.object().shape({
        content: Yup.string().min(3, 'un message doit contenir au moins 3 caractères'),
    })


    const fetchMessages = async () => {
        try{
            await ApiService.get('/messages-review/'+props.id, state).then((data) => setListMessages(data))
        }
        catch (e) {
            console.log(e)
        } 
        
    }

    
    const toggleisMessageContainerVisible = () => {
        setisMessageContainerVisible(!isMessageContainerVisible);
    }

    const addMessageToReview = (values) => {
        try{
            ApiService.post('/messages-review', values  , state)
                .then(() => fetchMessages() )
        }
        catch (error) {
            console.log(error)
        } 
    }

    
    useEffect(() => {
        //console.log("props.id: ", props.id)
        fetchMessages()
            // .then(() => (console.log(listMessages)));
    },[])

    const Messages = () => (
        <ul className="listMessages">
            {(listMessages || []).map(item => (
                <div className="message">
                    <p className="messageWriter">{item.user.login}</p>
                    <p className="messageContent">{item.content}</p>
                </div>
            ))}
        </ul>
    );

    return (
        <div className="reviewAllContainer">
            <div className="ReviewContainer">
                <div className="reviewRating">
                    <div className="stars">
                            <svg className={props.rating>=1 ? "personnalFilledStar" : "personnalUnfilledStar"} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                            <svg className={props.rating>=2 ? "personnalFilledStar" : "personnalUnfilledStar"} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                            <svg className={props.rating>=3 ? "personnalFilledStar" : "personnalUnfilledStar"} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                            <svg className={props.rating>=4 ? "personnalFilledStar" : "personnalUnfilledStar"} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>                                    
                            <svg className={props.rating>=5 ? "personnalFilledStar" : "personnalUnfilledStar"} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                    </div>
                </div>
                <div className="reviewWriter">
                    {props.writer}
                </div>
                <div className="reviewContent">
                    {props.content}
                </div>

                <button  onClick={toggleisMessageContainerVisible} className="showMessageButton">{isMessageContainerVisible ? "hide" : "show"} messages</button>
            </div>
            <div className={isMessageContainerVisible ? "MessagesAllContainer visible" : "MessagesAllContainer hidden"}>
                <div className="MessagesContainer">
                    <Messages/>
                </div>
                <Formik
                initialValues={initialValues}
                validationSchema={messageSchema}
                onSubmit={(values) => {
                    addMessageToReview(values)
                }}
                >{({handleChange, handleSubmit, values, errors, touched}) => (
                    <div className="form">
                        <input
                            className="newMessageInput"
                            type="textarea"
                            name="content"
                            placeholder="Message"
                            onChange={handleChange('content')}
                            value={values.content}
                        />                  
                        <button type="submit" onClick={() => handleSubmit()} className="newMessageButton">add message</button>
                    </div>
                )}  
                </Formik>
            </div>
        </div>
    );
}

export default Review;

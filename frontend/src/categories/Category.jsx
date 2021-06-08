import React, {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import ApiService from "../services/ApiService";
import {AuthContext} from "../contexts/AuthContext";
import PreviewRecomandation from "../recommendation/Preview";



const Category = (props) => {
    const {state} = useContext(AuthContext);
    const location = useLocation();
    const [list, setList] = useState([]);

    const fetchRecomandations = async () => {
        await ApiService.get('/recomendations?', state).then((data) =>  setList(data))
    }

    useEffect(() => {
        console.log(location?.state?.country)
        fetchRecomandations()
            .then(() => (console.log(list)));
    }, [])

    const List = () => (
        <ul>
            {(list || []).map(item => (
                <PreviewRecomandation title={item.title} content={item.content}/>
            ))}
        </ul>
    );

    return (
        <div>
            <List/>
        </div>
    );
};
export default Category;

import React, {useContext, useEffect, useState} from "react";
import ApiService from "../services/ApiService";
import {AuthContext} from "../contexts/AuthContext";
import PreviewRecomandation from "../Recommendation/Preview";



const Category = (props) => {
    const {state} = useContext(AuthContext);
    const [list, setList] = useState([]);

    const fetchRecomandations = async () => {
        await ApiService.get('/recomendations?', state).then((data) =>  setList(data))
    }

    useEffect(() => {
        console.log(props?.location?.state?.index)
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

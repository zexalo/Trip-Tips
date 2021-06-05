import React, {useContext, useEffect, useState} from "react";
import ApiService from "../services/ApiService";
import {AuthContext} from "../contexts/AuthContext";
import PreviewRecomandation from "../recommendation/Preview";



const Category = (props) => {
    const {state} = useContext(AuthContext);
    const [list, setList] = useState([]);

    /*
    const listIDFavorite = ApiService.get('/favorites', state)
        .then((data: Recomandation[]) => {
            data.map(item : Recomandation => item.id);
        }
        );
    */

    const fetchRecomandations = async () => {
        await ApiService.get('/recomendations?', state).then((data) =>  setList(data))
    }

    useEffect(() => {
        console.log(props?.location?.state?.index)
        fetchRecomandations()
            .then(() => (console.log(list)));
    }, [])

    const List = () => (
        <ul style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            paddingTop: '50px',
        }}>
            <p style={{
                color: 'white',
                fontSize: 24,
            }}>Recommendations</p>
            {(list || []).map(item => (
                /*
                //Check si l'id est dans la liste des id favoris
                let isUserFavorite = false;
                if (listIDFavorite.includes(item.id)){
                isUserFavorite = true;
                }
                */
            <PreviewRecomandation title={item.title} content={item.content} id={item.id}/>
            ))}
        </ul>
    );

    return (
        <div>
            <List />
        </div>
    );
};
export default Category;

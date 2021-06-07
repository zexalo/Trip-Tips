import React, {useContext, useEffect, useState} from "react";
import ApiService from "../services/ApiService";
import {AuthContext} from "../contexts/AuthContext";
import PreviewRecomandation from "../Recommendation/Preview";



const Category = (props) => {
    const {state} = useContext(AuthContext);
    const [list, setList] = useState([]);
    const[listIdRecomandationFav, setListIdRecomandationFav] = useState([]);
    
    const fetchFavoriteRecommandationID = async () => { 
        await ApiService.get('/favorites', state).then( (data) =>  setListIdRecomandationFav(data.map( (item) => item.id ) ) )
        //await ApiService.get('/favorites', state).then( (data) =>  setListIdRecomandationFav(data))
    }

    const fetchRecomandations = async () => {
        await ApiService.get('/recomendations?', state).then((data) =>  setList(data))
    }

    useEffect(() => {
        //console.log(props?.location?.state?.index)
        fetchFavoriteRecommandationID()
            //.then(() => (console.log(listIdRecomandationFav)));
        fetchRecomandations()
            //.then(() => (console.log(list)));
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
                
                console.log(item),
                /*
                console.log(listIdRecomandationFav),
                console.log(item.id),
                console.log(listIdRecomandationFav.includes(item.id)),
                */
                
            <PreviewRecomandation title={item.title} content={item.content} id={item.id} isInUserFavorite={listIdRecomandationFav.includes(item.id)} globalRating={item.globalRating} city={item.city} country={item.country} picture={item.picture} price={item.price}  />
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

import React, {useContext, useEffect, useState} from "react";
import PreviewRecomandation from "../Recommendation/Preview";
import {Recomandation} from "../models/Recomandation";
import ApiService from "../services/ApiService";
import {AuthContext} from "../contexts/AuthContext";


const Category: React.FC = () => {
    const {state} = useContext(AuthContext);
    const [list, setList] = useState<Recomandation[]>([]);

    const fetchRecomandations = async () => {
        await ApiService.get<Recomandation[]>('/recomendations?', state).then((data) => setList(data))
    }

    useEffect(() => {
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
                <PreviewRecomandation title={item.title} content={item.content} id={item.id}/>
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

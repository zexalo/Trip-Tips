import React, {useContext, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ApiService from "../services/ApiService";
import {AuthContext} from "../contexts/AuthContext";
import {Link} from "react-router-dom";
import './recommendation.css';
import "./styleRecommendation.scss";

const useStyles = makeStyles({
    root: {
        width: '75%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '15px',
        flexDirection: 'column',
        position: 'relative',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    pos: {
        marginBottom: 12,
    },
});

type RecomandationProps = {
    title: string,
    content: string,
    id: number,
    isInUserFavorite: boolean,
    globalRating: number
};


const PreviewRecomandation: React.FC<RecomandationProps> = ({title, content, id, isInUserFavorite, globalRating}) => {
    const classes = useStyles();
    const {state, dispatch} = useContext(AuthContext);
    const [isInUserFavoriteLocal, setIsInUserFavoriteLocal] = useState<boolean>(isInUserFavorite);

    const toggleFavorite = (id: number) => {
        // console.log(id);
        ApiService.put('/favorite/' + id, {}, state)
        setIsInUserFavoriteLocal(!isInUserFavoriteLocal)
        
        /*
            .then((data) => {
                console.log(data);
            }
            )
            .catch((e) => {
                console.log(e);
            });
        */
    };


    return (
        <Card className={classes.root + " recommandationPreview"}>
            <CardContent>
                <h1 className='title'>
                    {title}
                </h1>
                <h2 className="content">
                    {content}
                </h2>
            </CardContent>
            <div className="favoriteButtonContainer">
                <button onClick={() => toggleFavorite(id)} className="favoriteButton">
                    <svg className={isInUserFavoriteLocal ? "isFavorite" : "isNotFavorite"} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 24 24">
                        <path
                            d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
                    </svg>
                </button>
            </div>
            <div className="ratingMainContainer">
                <div className="ratingContainer">
                <svg className={globalRating>=1 ? "filledStar" : "unfilledStar"} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                <svg className={globalRating>=2 ? "filledStar" : "unfilledStar"} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                <svg className={globalRating>=3 ? "filledStar" : "unfilledStar"} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                <svg className={globalRating>=4 ? "filledStar" : "unfilledStar"} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                <svg className={globalRating>=5 ? "filledStar" : "unfilledStar"} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                </div>
            </div>
            <CardActions>
                <Link
                    to={{pathname: "/recommandation"}}
                >
                    <Button onClick={() => console.log("click")} size="small">See Details</Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default PreviewRecomandation;

import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

type RecomandationProps = {
    title: string,
    content: string,
    id: number,
    isInUserFavorite: boolean,
    globalRating: number,
    city: string,
    country: string
    picture: string,
    price: number
};

const PreviewRecomandationInProfile: React.FC<RecomandationProps> = ({title, content, id, isInUserFavorite, globalRating, city, country, picture, price}) => {

    return (
        <div className="favoriteReco">
            <h1>{title}</h1>
            <CardActions>
                <Link
                    to={{
                        pathname: "/recommandation",
                        state: {title: title, content: content, id: id, isInUserFavorite: isInUserFavorite, globalRating: globalRating, city: city, country: country, picture: picture, price: price},
                }}
                >
                    <Button onClick={() => console.log("click")} size="small">See Details</Button>
                </Link>
            </CardActions>
        </div>
    );
}

export default PreviewRecomandationInProfile;

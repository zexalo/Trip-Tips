import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

type RecomandationProps = {
    title: string,
    content: string,
};

const PreviewRecomandationInProfile: React.FC<RecomandationProps> = ({title, content}) => {

    return (
        <div className="favoriteReco">
            <h1>{title}</h1>
            <CardActions>
                <Link
                    to={{pathname: "/recommandation"}}
                >
                    <Button onClick={() => console.log("click")} size="small">See Details</Button>
                </Link>
            </CardActions>
        </div>
    );
}

export default PreviewRecomandationInProfile;

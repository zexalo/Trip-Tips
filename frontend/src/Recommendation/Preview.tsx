import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Recomandation} from "../models/Recomandation";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
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

type RecomandationProps = {
    title: string,
    content: string,
};

const PreviewRecomandation: React.FC<RecomandationProps> = ({title, content}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h5" component="h2">
                    {content}
                </Typography>
            </CardContent>
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

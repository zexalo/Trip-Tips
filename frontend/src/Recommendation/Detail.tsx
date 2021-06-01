import React, {useContext, useEffect, useState} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import ApiService, {HTTPRequestError} from "../services/ApiService";
import {AuthContext} from "../contexts/AuthContext";
import {Formik, FormikValues} from "formik";
import {TextField} from "@material-ui/core";
import {Review} from "../models/Review";
import {Recomandation} from "../models/Recomandation";
import Comments from "./Comments";

const useStyles = makeStyles({
    root: {
        width: '75%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '15px',
        flexDirection: 'column',
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

type ReviewFormValues = {
    content: string,
    rating?: number,
    recomendation: {
        id: number
    },
    user: {
        id: number
    },
    createdAt: string
}

const DetailRecomandation: React.FC = () => {
    const classes = useStyles();
    const {state} = useContext(AuthContext);
    const [list, setList] = useState<Review[]>([]);

    const fetchReviews = async () => {
        await ApiService.get<Review[]>('/reviews?', state).then((data) => setList(data))
    }

    const postReview = async (values: FormikValues) => {
        try {
            console.log(values)
            await ApiService.post('/reviews', values, state)
                .then(() => fetchReviews())
                .catch((e: HTTPRequestError) => {
                    console.log(e);
                });
        } catch (e) {
            console.log('e', e)
        }
    }

    const initialValues: ReviewFormValues = {
        content: "",
        rating: 0,
        recomendation: {
            id: 10
        },
        user: {
            id: 5
        },
        createdAt: "2021-05-24T12:55:58.355Z"
    };

    useEffect(() => {
        fetchReviews()
            .then(() => (console.log(list)));

        //TODO: add date
        // const now = new Date().toLocaleString();
        // const date = new Date(now);
        // console.log(date);
    }, [])

    const List = () => (
        <ul style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            {(list || []).map(item => (
                <Comments title={item.user.login} content={item.content}/>
            ))}
        </ul>
    );

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Title recomandation
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Content recomandation
                    </Typography>
                    <Typography variant="h6" component="h2">
                        Commentaires
                    </Typography>
                </CardContent>

                <List/>

                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        postReview(values)
                    }}>{({handleChange, handleSubmit, values}) => (
                    <div>
                        <input
                            type="textarea"
                            name="content"
                            placeholder="Commentaire"
                            onChange={handleChange('content')}
                            value={values.content}
                        />
                        <CardActions>
                            <Button onClick={() => postReview(values)} size="small">See Details</Button>
                        </CardActions>
                    </div>
                )}
                </Formik>
            </Card>
        </div>

    );
};

export default DetailRecomandation;

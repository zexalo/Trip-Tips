import React from 'react';
import lostTourist from "./images/lost-tourist-big.png";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        color: "white",
    },
});

const NotFound: React.FC = () => {
    const classes = useStyles();
    return(
        <div>
            <Typography className={classes.title} variant="h1" component="h1" >404 Not Found</Typography>
            <img src={lostTourist} />
        </div>
    )
}
export default NotFound;
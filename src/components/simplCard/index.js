import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// const useStyles = makeStyles({
//     root: {
//         minWidth: 275
//     },
//     bullet: {
//         display: "inline-block",
//         margin: "0 2px",
//         transform: "scale(0.8)"
//     },
//     title: {
//         fontSize: 14
//     },
//     pos: {
//         marginBottom: 12
//     }
// });

export default function SimpleCard({ title, url, btnName }) {
    // const classes = useStyles();

    return (
        <Card>
            <CardContent>
                <Typography color="primary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" component="p">

                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    <a href={url || 'https://github.com/taron0'} target="_blank" rel="noreferrer">
                        {btnName || 'Open web site'}
                    </a>
                </Button>
            </CardActions>
        </Card>
    );
}


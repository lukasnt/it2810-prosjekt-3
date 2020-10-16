import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import './index.css';

export interface MovieCardProps {
    title : string;
    imageUrl : string;
    description : string;
    rating : number;
    voteCount: number;
}

const MovieCard : React.FunctionComponent<MovieCardProps> = ({ title, imageUrl, description, rating, voteCount }) => {

    return (
        <Card className="movie-card">
            <CardActionArea>
                <CardMedia className="movie-card-media"
                    image={imageUrl}
                    title="Contemplative Reptile"
                />
                <CardContent className="movie-card-content">
                    <Typography className="movie-card-title" gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography className="movie-card-text" variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Rating value={rating / 2} precision={0.1} readOnly />
                <Typography variant="body2"> {"Vote Count: " + voteCount} </Typography>
            </CardActions>
        </Card>
    );
};

export default MovieCard;
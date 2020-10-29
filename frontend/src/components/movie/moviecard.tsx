import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export interface MovieCardProps {
    tconst : string;
    title : string;
    imageUrl : string;
    description : string;
    rating : number;
    voteCount: number;
}

const MovieCard : React.FunctionComponent<MovieCardProps> = ({ tconst, title, imageUrl, description, rating, voteCount }) => {

    return (
        <Card className="movie-card">
            <CardActionArea>
                <Link className="link" to={"/movie/" + tconst}> 
                    <CardMedia data-testid='media' className="movie-card-media"
                        image={imageUrl}
                        title={title}
                    />
                    <CardContent className="movie-card-content">
                        <Typography className="movie-card-title" gutterBottom variant="h5" color="textPrimary" component="h2">
                            {title}
                        </Typography>
                        <Typography data-testid='description' className="movie-card-text" variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                    </CardContent>
                </Link>
            </CardActionArea>
            <CardActions>
                <Rating value={rating / 2} precision={0.1} readOnly />
                <Typography variant="body2"> {"Vote Count: " + voteCount} </Typography>
            </CardActions>
        </Card>
    );
};

export default MovieCard;
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import React from 'react';

export interface MovieCardProps {
    title : string;
    imageUrl : string;
    description : string;
}

const MovieCard : React.FunctionComponent<MovieCardProps> = ({ title, imageUrl, description }) => {

    return (
        <Card className="movie-card">
            <CardActionArea>
                <CardMedia className="movie-card-media"
                    image={imageUrl}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary"> Share </Button>
                <Button size="small" color="primary"> Learn More </Button>
            </CardActions>
        </Card>
    );
};

export default MovieCard;
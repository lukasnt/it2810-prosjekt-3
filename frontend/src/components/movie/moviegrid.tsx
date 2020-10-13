import React from 'react';
import './index.css';
import MovieCard, { MovieCardProps } from './moviecard';
import { Grid } from '@material-ui/core';

interface MovieGridProps {
    data : Array<MovieCardProps>;
}

const MovieGrid : React.FunctionComponent<MovieGridProps> = ({ data }) => {

    function generateMovieCards() {
        return data.map(card => <Grid item key={card.title}> <MovieCard {...card} /> </Grid>);
    }

    return (
        <Grid container spacing={2}>
            {generateMovieCards()}
        </Grid>
    );
}

export default MovieGrid;
import React from 'react';
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
        <div className="movieGrid">
            <Grid container spacing={2}>
                {generateMovieCards()}
            </Grid>
        </div>
    );
};
export default MovieGrid;
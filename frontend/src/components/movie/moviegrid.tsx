import React from 'react';
import MovieCard, { MovieCardProps } from './moviecard';
import { Grid } from '@material-ui/core';
import { Movie } from '../utils/reducers/movies';

interface MovieGridProps {
    data : Array<Movie>;
}

const MovieGrid : React.FunctionComponent<MovieGridProps> = ({ data }) => {

    function generateMovieCards() {
        return data.map(card => 
            <Grid item key={card.tconst}> 
                <MovieCard 
                    title={card.primaryTitle}
                    imageUrl={card.posterPath}
                    description={card.overview}
                 /> 
            </Grid>
        );
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
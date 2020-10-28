import React from 'react';
import MovieCard from './moviecard';
import { Grid } from '@material-ui/core';
import { Movie } from '../../redux/reducers/searchresult';

interface MovieGridProps {
    data : Array<Movie>;
}

const MovieGrid : React.FunctionComponent<MovieGridProps> = ({ data }) => {

    function generateMovieCards() {
        return data.map(card => 
            <Grid item key={card.tconst}> 
                <MovieCard 
                    tconst={card.tconst}
                    title={card.primaryTitle}
                    imageUrl={card.posterPath}
                    description={card.overview}
                    rating={card.voteAverage}
                    voteCount={card.voteCount}
                 /> 
            </Grid>
        );
    }

    return (
        <div className="movie-grid">
            <Grid container spacing={2}
                direction="row"
                alignItems="center"
                justify="center"
            >
                {generateMovieCards()}
            </Grid>
        </div>
    );
};

export default MovieGrid;
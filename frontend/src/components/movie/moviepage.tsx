import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Hidden, Card, CardContent, CardMedia, Typography, Grid } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import FavoriteButton from "./favoritebutton";
import { Movie } from '../../redux/reducers/searchresult';

const MoviePage : React.FunctionComponent = () => {

    const [voteAverage, setVoteAverage] = useState('');
    const [voteCount, setVoteCount] = useState('');
    const [myRating, setMyRating] = useState('');

    let params : any = useParams();

    const [movie, setMovie] = useState<Movie>({
        tconst: params.tconst,
        titleType: "",
        primaryTitle: "",
        originalTitle: "",
        isAdult: "",
        startYear: 0,
        endYear: "",
        runtimeMinutes: 0,
        genres: "",
        posterPath: "",
        voteAverage: 0,
        voteCount: 0,
        originalLanguage: "",
        overview: ""
    });

    useEffect(() => {
        console.log(params.tconst);
        fetch('http://localhost:8080/api/movie/single/' + params.tconst)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                setVoteCount(data.voteCount);
                setVoteAverage(data.voteAverage);
                setMyRating('');
            })
    }, []);

    function saveUserRating(rating : number | null) : void {
        if (rating) {
            let ratingSum = (+voteAverage * +voteCount) + rating*2;
            let newVoteCount = +voteCount;
            if (myRating) {
                ratingSum -= +myRating*2
            } else {
                newVoteCount += 1
            }
            const newVoteAverage = ratingSum / newVoteCount;
            
            setMyRating(String(rating));
            setVoteAverage(String(newVoteAverage));
            setVoteCount(String(newVoteCount));

            // TD: Save vote to database
        }
    }

    return (
        <Grid container spacing={2} justify='center' alignItems='center' style={{width: '100%', minHeight: '95vh', backgroundImage: 'linear-gradient(to right, rgba(44,44,44,1) 15%, rgba(44,44,44,0.7)), url(' + movie.posterPath + ')', backgroundSize: 'cover', backgroundPositionY: '50%', margin: '0px'}}>
            <Hidden xsDown>
                <Grid item xs={12} sm={5} md={3} style={{height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Card style={{width: '300px', display: 'flex', justifyContent: 'center', marginLeft: '5%'}}>
                        <CardMedia style={{height: '450px', width: '300px'}}
                            image={movie.posterPath}
                            title={movie.primaryTitle}
                        />        
                    </Card>
                </Grid>
            </Hidden>
            <Grid item xs={12} sm={7} md={9} style={{height: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Card style={{backgroundColor: 'transparent', boxShadow: 'none', marginLeft: '5%', marginRight: '5%'}}>
                    <CardContent style={{color: 'white'}}>
                        <Typography variant='h3'>
                            {movie.primaryTitle + ' (' + movie.startYear + ')'}
                        </Typography>
                        <Typography variant='subtitle1' style={{marginTop: '10px'}}>
                            {movie.genres + ' • ' + ((+movie.runtimeMinutes-(+movie.runtimeMinutes % 60)) / 60) + ' h ' + (+movie.runtimeMinutes % 60) + ' m'}
                        </Typography>
                        <div style={{display: 'flex', flexDirection: 'row', marginTop: '10px'}}>
                            <Rating name='hover-feedback' value={+myRating} onChange={(e, newValue) => saveUserRating(newValue)} style={{marginRight: '3%'}}/>
                            <Typography variant='subtitle1' >
                                {'(' + String((+voteAverage/2.).toFixed(2)) + ') • ' + voteCount + ' ratings'}
                            </Typography>
                        </div>
                        <FavoriteButton movie={movie}/>
                        <Typography variant='h5' style={{marginTop: '20px'}}>
                            Overview
                        </Typography>
                        <Typography variant='body2' style={{marginTop: '10px'}}>
                            {movie.overview}
                        </Typography>
                    </CardContent>          
                </Card>
            </Grid>
        </Grid> 
    );
};

export default MoviePage;

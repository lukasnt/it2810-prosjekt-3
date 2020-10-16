import React, { Dispatch, useEffect } from 'react';
import { Movie } from '../utils/reducers/movies';
import FilterList from '../filters/filterlist';
import MovieGrid from './moviegrid';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../utils/store';
import { Pagination } from '@material-ui/lab';
import Search from '../search';
import OrderSelect from '../order/orderselect';
import './index.css';
import { executeSearch, SearchParams } from '../utils/reducers/searchparams';
import { CircularProgress } from '@material-ui/core';
import { setLoading } from '../utils/actions/searchparams';

const MoviePage : React.FunctionComponent = () => {

    const movies : Array<Movie> | null = useSelector((state : AppState) => state.movies);
    const searchParams : SearchParams = useSelector((state : AppState) => state.searchParams);
    const dispatch : Dispatch<any> = useDispatch();

    /* Dummy data, to be given by props */
    const filterType = "Genre";
    const filterValues =["Action", "Adventure", "Comedy", "Documentary", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller", "Western"];
    
    const orderLabels = ["Title", "Release Year", "Runtime Minutes", "Vote Average", "Vote Count"];
    const orderValues = ["primaryTitle", "startYear", "runtimeMinutes", "voteAverage", "voteCount"];

    useEffect(() => {
        executeSearch(searchParams);
    }, []);

    function test() {
        console.log(searchParams.loading);
        return <CircularProgress />
    }

    return (
        <div className="moviePage">
            <FilterList filtertype={filterType} filters={filterValues}/>
            <div className="movieView">
                <div className="movieViewHeader"> 
                    <Search />
                    <OrderSelect orderValues={orderValues} orderLabels={orderLabels} defaultValue="voteCount"/>
                </div> 
                <Pagination count={10} color="primary" />
                {searchParams.loading == true ? test() : null}
                <MovieGrid data={movies == null ? [] : movies}/>
            </div>
        </div>
    );
};
export default MoviePage;
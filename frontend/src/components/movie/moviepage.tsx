import React, { useEffect } from 'react';
import { SearchResult } from '../utils/reducers/searchresult';
import FilterList from '../filters/filterlist';
import MovieGrid from './moviegrid';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../utils/store';
import Search from '../search';
import OrderSelect from '../order/orderselect';
import './index.css';
import { executeSearch, SearchParams } from '../utils/reducers/searchparams';
import { CircularProgress } from '@material-ui/core';
import Pager from '../pager';
import { Dispatch } from '@reduxjs/toolkit';

const MoviePage : React.FunctionComponent = () => {

    const searchResult : SearchResult | null = useSelector((state : AppState) => state.searchResult);
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

    return (
        <div className="moviePage">
            <FilterList filtertype={filterType} filters={filterValues}/>
            <div className="movieView">
                <div className="movieViewHeader"> 
                    <Search />
                    <OrderSelect orderValues={orderValues} orderLabels={orderLabels} defaultValue="voteCount"/>
                </div> 
                <Pager />
                {searchParams.loading ? <CircularProgress size={250}/> : null}
                <MovieGrid data={ searchParams.loading ? [] : (searchResult?.movies != null ? searchResult.movies : [])}/>
            </div>
        </div>
    );
};
export default MoviePage;
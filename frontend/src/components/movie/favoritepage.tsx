import React, { useEffect } from 'react';
import { SearchResult } from '../utils/reducers/searchresult';
import MovieGrid from './moviegrid';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../utils/store';
import OrderSelect from '../order/orderselect';
import './index.css';
import { executeSearch, SearchParams } from '../utils/reducers/searchparams';
import {CircularProgress} from '@material-ui/core';
import Pager from '../pager';

const FavoritesPage : React.FunctionComponent = () => {

    const searchResult : SearchResult | null = useSelector((state : AppState) => state.searchResult);
    const searchParams : SearchParams = useSelector((state : AppState) => state.searchParams);

    const orderLabels : Array<string>  = ["Relevance", "Title", "Release Year", "Runtime Minutes", "Vote Average", "Vote Count"];
    const orderValues : Array<string>  = ["relevance", "primaryTitle", "startYear", "runtimeMinutes", "voteAverage", "voteCount"];

    useEffect(() => {
        executeSearch(searchParams);
    }, []);

    return (
        <div className="moviePage">
            <div className="favoritesViewHeader">
                <OrderSelect orderValues={orderValues} orderLabels={orderLabels} defaultValue="voteCount"/>
            </div>
            <Pager />
            {searchParams.loading ? <CircularProgress size={250}/> : null}
            <MovieGrid data={ searchParams.loading ? [] : (searchResult?.movies != null ? searchResult.movies : [])}/>
            <Pager />
        </div>
    );
};

export default FavoritesPage;
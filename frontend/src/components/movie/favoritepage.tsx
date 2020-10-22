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
import { User } from '../utils/reducers/user';

const FavoritesPage : React.FunctionComponent = () => {

    const user : User | null = useSelector((state : AppState) => state.user);

    const orderLabels : Array<string>  = ["Relevance", "Title", "Release Year", "Runtime Minutes", "Vote Average", "Vote Count"];
    const orderValues : Array<string>  = ["relevance", "primaryTitle", "startYear", "runtimeMinutes", "voteAverage", "voteCount"];

    useEffect(() => {
        
    }, []);

    return (
        <div className="moviePage">
            <div className="favoritesViewHeader">
                <OrderSelect orderValues={orderValues} orderLabels={orderLabels} defaultValue="voteCount"/>
            </div>
            <Pager />
                <MovieGrid data={ user == null ? [] : user.favorites }/>
            <Pager />
        </div>
    );
};

export default FavoritesPage;
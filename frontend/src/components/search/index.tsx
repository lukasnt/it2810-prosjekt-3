import { TextField } from '@material-ui/core';
import { Dispatch } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../utils/actions/searchparams';
import { SearchParams } from '../utils/reducers/searchparams';
import { SearchResult } from '../utils/reducers/searchresult';
import { AppState } from '../utils/store';
import "./index.css";

const Search : React.FunctionComponent = () => {

    const searchParams : SearchParams | null = useSelector((state : AppState) => state.searchParams);
    const dispatch : Dispatch<any> = useDispatch();

    function searchMovies(ev : any) {
        if (ev.key === 'Enter') {
            let query : string = ev.target.value;
            dispatch(setQuery(query));
        }
    }

    return (
        <TextField className="movietitle-searchfield" defaultValue={searchParams.query} label="Search movie" onKeyPress={searchMovies}/>
    );
};
export default Search;
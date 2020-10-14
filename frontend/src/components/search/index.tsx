import { TextField } from '@material-ui/core';
import { Dispatch } from '@reduxjs/toolkit';
import React, { KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from '../utils/actions/movies';
import { setQuery } from '../utils/actions/searchparams';
import { Movie } from '../utils/reducers/movies';
import { SearchParams } from '../utils/reducers/searchparams';
import { AppState } from '../utils/store';

const Search : React.FunctionComponent = () => {

    const dispatch : Dispatch<any> = useDispatch();

    function searchMovies(ev : any) {
        if (ev.key === 'Enter') {
            let query : string = ev.target.value;
            dispatch(setQuery(query));
        }
    }

    return (
        <TextField id="movietitle-searchfield" label="Search movie" onKeyPress={searchMovies}/>
    );
};
export default Search;
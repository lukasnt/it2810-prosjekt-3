import { TextField } from '@material-ui/core';
import { Dispatch } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setQuery } from '../utils/actions/searchparams';
import "./index.css";

const Search : React.FunctionComponent = () => {

    const dispatch : Dispatch<any> = useDispatch();

    function searchMovies(ev : any) {
        if (ev.key === 'Enter') {
            let query : string = ev.target.value;
            dispatch(setQuery(query));
        }
    }

    return (
        <TextField className="movietitle-searchfield" label="Search movie" onKeyPress={searchMovies}/>
    );
};
export default Search;
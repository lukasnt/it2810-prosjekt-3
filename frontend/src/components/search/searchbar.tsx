import {InputAdornment, TextField} from '@material-ui/core';
import { Dispatch } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../../redux/actions/searchparams';
import { SearchParams } from '../../redux/reducers/searchparams';
import { AppState } from '../../redux/store';
import "./index.css";
import SearchIcon from "@material-ui/icons/Search";

const SearchBar : React.FunctionComponent = () => {

    const searchParams : SearchParams | null = useSelector((state : AppState) => state.searchParams);
    const dispatch : Dispatch<any> = useDispatch();

    // When the enter-key is pressed the query in searchParams in global state is updated
    function searchMovies(ev : any) {
        if (ev.key === 'Enter') {
            let query : string = ev.target.value;
            dispatch(setQuery(query));
        }
    }

    return (
        <TextField
            className="searchField"
            defaultValue={searchParams.query}
            label="Search movie title"
            onKeyPress={searchMovies}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon/>
                    </InputAdornment>
                ),
            }}
        />
    );
};
export default SearchBar;
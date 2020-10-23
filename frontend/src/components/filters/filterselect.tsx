
import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { List, ListItem, ListSubheader, TextField, Typography } from '@material-ui/core';
import { SearchParams } from '../utils/reducers/searchparams';
import { AppState } from '../utils/store';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { setLanguage } from '../utils/actions/searchparams';

export interface Language {
    code: string;
    title: string;
}

export interface FilterSelectProps {
    filtertype : string;
    options : Array<Language>;
}

const FilterSelect : React.FunctionComponent<FilterSelectProps> = ( {filtertype, options} ) => {
    
    const searchParams : SearchParams = useSelector((state : AppState) => state.searchParams);
    const dispatch : Dispatch<any> = useDispatch();

    function handleChange(event: any, newValue: Language | null) {
        dispatch(setLanguage(newValue == null ? "" : newValue.code));
    };

    function getDefaultValue() : Language | null | undefined {
        return searchParams.language == "" ? null : options.find(opt => opt.code == searchParams.language);
    }

    return (
        <List dense subheader={<ListSubheader>{filtertype}</ListSubheader>}>
            <ListItem>
                <Autocomplete
                    options={options}
                    getOptionLabel={(option) => option.title + " - " + option.code}
                    value={getDefaultValue()}
                    onChange={handleChange}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label={filtertype} variant="outlined" />}
                />    
            </ListItem>
        </List>
    );
};

export default FilterSelect;

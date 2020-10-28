
import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { List, ListItem, ListSubheader, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { SearchParams } from '../../../redux/reducers/searchparams';
import { AppState } from '../../../redux/store';
import { setLanguage } from '../../../redux/actions/searchparams';

export interface Language {
    code: string;
    title: string;
}

export interface FilterSelectProps {
    filtertype : string;
    options : Array<Language>;
}

const LanguageList : React.FunctionComponent<FilterSelectProps> = ({filtertype, options} ) => {
    
    const searchParams : SearchParams = useSelector((state : AppState) => state.searchParams);
    const dispatch : Dispatch<any> = useDispatch();

    function handleChange(event: any, newValue: Language | null) {
        dispatch(setLanguage(newValue == null ? "" : newValue.code));
    }

    function getDefaultValue() : Language | null | undefined {
        return searchParams.language == "" ? null : options.find(opt => opt.code == searchParams.language);
    }

    return (
        <List className="languageList" dense subheader={<ListSubheader disableSticky>{filtertype}</ListSubheader>}>
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

export default LanguageList;

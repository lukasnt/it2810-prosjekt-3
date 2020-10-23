import React from 'react';
import {
    Checkbox,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader, TextField
} from "@material-ui/core";
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { setGenres } from '../utils/actions/searchparams';
import { SearchParams } from '../utils/reducers/searchparams';
import { AppState } from '../utils/store';

export interface FilterProps {
    filtertype : string;
    filters : string[];
}

const FilterList : React.FunctionComponent<FilterProps> = ( {filtertype, filters} ) => {
    
    const searchParams : SearchParams | null = useSelector((state : AppState) => state.searchParams);
    const dispatch : Dispatch<any> = useDispatch();

    //State for checkboxes, will probably use redux instead
    const [checked, setChecked] = React.useState(searchParams.genres.map(name => filters.indexOf(name)));
    
    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        dispatch(setGenres(newChecked.map(index => filters[index])));
    };

    
    return (
        <div className="filterList">
            <List dense subheader={<ListSubheader>{filtertype}</ListSubheader>}>
            {filters.map((filter:string) => {
                const labelId = `checkbox-list-label-${filter}`;
                const index = filters.indexOf(filter);
                return (
                    <ListItem key={index} role={undefined} dense button onClick={handleToggle(index)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="end"
                                checked={checked.indexOf(index) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={filter} />
                    </ListItem>
                );
            })}
            </List>
        </div>
    );
};

export default FilterList;
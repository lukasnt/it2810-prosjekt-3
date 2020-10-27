import React from 'react';
import {
    Checkbox,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from "@material-ui/core";
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { SearchParams } from '../../redux/reducers/searchparams';
import { setGenres } from '../../redux/actions/searchparams';

export interface FilterProps {
    filtertype : string;
    filters : string[];
}

const FilterList : React.FunctionComponent<FilterProps> = ( {filtertype, filters} ) => {
    
    const searchParams : SearchParams | null = useSelector((state : AppState) => state.searchParams);
    const dispatch : Dispatch<any> = useDispatch();

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
        <List className="filterListGenre" dense subheader={<ListSubheader disableSticky>{filtertype}</ListSubheader>}>
        {filters.map((filter:string) => {
            const labelId = `checkbox-list-label-${filter}`;
            const index = filters.indexOf(filter);
            return (
                <ListItem className="filterListItem" key={index} role={undefined} dense button onClick={handleToggle(index)}>
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
    );
};

export default FilterList;
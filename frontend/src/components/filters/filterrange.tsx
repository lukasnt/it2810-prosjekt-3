import React from 'react';
import { Checkbox, List, ListItem, ListItemText, ListSubheader, Slider, Typography } from '@material-ui/core';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { setRuntimeMinutes } from '../../redux/actions/searchparams';
import { SearchParams } from '../../redux/reducers/searchparams';
import { AppState } from '../../redux/store';

export interface FilterRangeProps {
    filtertype : string;
}

const FilterRange : React.FunctionComponent<FilterRangeProps> = ( {filtertype} ) => {
    
    const searchParams : SearchParams = useSelector((state : AppState) => state.searchParams);
    const dispatch : Dispatch<any> = useDispatch();
    
    const [value, setValue] = React.useState<number[]>(searchParams.runtimeMinutes.length == 0 ? [20, 120] : searchParams.runtimeMinutes);
    const [checked, setChecked] = React.useState(searchParams.runtimeMinutes.length == 0);

    function valuetext(value: number) {
        return `${value} minutes`;
    }

    function handleChange(event: any, newValue: number | number[]) {
        setValue(newValue as number[]);
    };

    function handleChangeCommited(event: any, newValue: number | number[]) {
        dispatch(setRuntimeMinutes(newValue as number[]));
    };
    
    function handleCheckChange(event: React.ChangeEvent<HTMLInputElement>) {
        setChecked(event.target.checked);
        if (!event.target.checked)
            dispatch(setRuntimeMinutes(value));
        else
            dispatch(setRuntimeMinutes([]));
    };

    return (
        <List dense subheader={<ListSubheader>{filtertype}</ListSubheader>}>
            <ListItem>  
                <Slider
                    value={value}
                    max={240}
                    onChange={handleChange}
                    onChangeCommitted={handleChangeCommited}
                    disabled={checked}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                />
            </ListItem>
            <ListItem>
                    <Checkbox
                        checked={checked}
                        onChange={handleCheckChange}
                        aria-labelledby="limit-checkbox"
                    />
                    <ListItemText id="limit-checkbox" primary="No limit"/>
            </ListItem>
        </List>
    );
};

export default FilterRange;

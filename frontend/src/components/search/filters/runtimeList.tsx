import React from 'react';
import { List, ListItem, ListSubheader, Slider } from '@material-ui/core';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { setRuntimeMinutes } from '../../../redux/actions/searchparams';
import { SearchParams } from '../../../redux/reducers/searchparams';
import { AppState } from '../../../redux/store';

export interface FilterRangeProps {
    filtertype : string;
}

const RuntimeList : React.FunctionComponent<FilterRangeProps> = ({filtertype} ) => {
    
    const searchParams : SearchParams = useSelector((state : AppState) => state.searchParams);
    const dispatch : Dispatch<any> = useDispatch();
    
    // A two-valued array for runtimeMinutes filter: [minValue, maxValue]. Default set to the value in searchParams in redux
    const [value, setValue] = React.useState<number[]>(searchParams.runtimeMinutes.length == 0 ? [0, 480] : searchParams.runtimeMinutes);
    
    // How text is displayed on slider
    function valuetext(value: number) : string {
        return `${value} minutes`;
    }

    // When the slider is dragged the local state value is updated
    function handleChange(event: any, newValue: number | number[]) : void {
        setValue(newValue as number[]);
    }

    // When the slider is dropped (comitted) the global state for runtimeMinutes is updated
    function handleChangeCommited(event: any, newValue: number | number[]) : void {
        dispatch(setRuntimeMinutes(newValue as number[]));
    }

    return (
        <List className="runtimeList" dense subheader={<ListSubheader disableSticky>{filtertype}</ListSubheader>}>
            <ListItem>  
                <Slider
                    className="rangeSlider"
                    value={value}
                    max={480}
                    onChange={handleChange}
                    onChangeCommitted={handleChangeCommited}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                />
            </ListItem>
        </List>
    );
};

/*
<ListItem>
    <Checkbox
    checked={checked}
    onChange={handleCheckChange}
    aria-labelledby="limit-checkbox"/>
    <ListItemText id="limit-checkbox" primary="No limit"/>
</ListItem>
 */

export default RuntimeList;

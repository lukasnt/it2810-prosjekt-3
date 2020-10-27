import React from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { SearchParams } from '../utils/reducers/searchparams';
import { AppState } from '../utils/store';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import "./index.css";
import { setOrderField } from '../utils/actions/searchparams';

interface OrderSelectProps {
    orderLabels: Array<string>;
    orderValues: Array<string>;
    defaultValue: string;
}

const OrderSelect : React.FunctionComponent<OrderSelectProps> = ({ orderLabels, orderValues, defaultValue }) => {
    
    const searchParams : SearchParams | null = useSelector((state : AppState) => state.searchParams);
    const dispatch : Dispatch<any> = useDispatch();

    const [value, setValue] = React.useState(searchParams.orderField);

    function generateMenuItems() : JSX.Element[] {
        let jsx : JSX.Element[] = []; 
        for (let i : number = 0; i < orderValues.length; i++) {
            jsx.push(<MenuItem value={orderValues[i]} key={i}> {orderLabels[i]} </MenuItem>)
        }
        return jsx;
    }
    
    function handleChange(event: React.ChangeEvent<{ value: any }>) : void {
        setValue(event.target.value as string);
        dispatch(setOrderField(event.target.value as string))
    };

    return (
        <FormControl className="orderSelect">
            <InputLabel id="order-label"> Order on </InputLabel>
            <Select
                labelId="order-label"
                id="select-order"
                value={value}
                onChange={handleChange}
                autoWidth
            >
                {generateMenuItems()}
            </Select>
        </FormControl>
    );
};

export default OrderSelect;

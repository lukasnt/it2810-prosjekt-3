
import React from 'react';
import "./index.css";
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { SearchParams } from '../../redux/reducers/searchparams';
import { AppState } from '../../redux/store';
import { setOrderDir } from '../../redux/actions/searchparams';

interface OrderDirSelectProps {
    orderDir : number;
}

const OrderDirSelect : React.FunctionComponent<OrderDirSelectProps> = ({ orderDir }) => {

    const searchParams : SearchParams = useSelector((state : AppState) => state.searchParams);
    const dispatch : Dispatch<any> = useDispatch();
    
    const [alignment, setAlignment] = React.useState(searchParams.orderDir);

    const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: number | null) => {
        if (newAlignment !== null) {
          setAlignment(newAlignment);
          dispatch(setOrderDir(newAlignment));
        }
    };

    return (
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            orientation="horizontal"
        >
            <ToggleButton value={1} aria-label="left aligned">
              <ArrowDropUp />
            </ToggleButton>
            <ToggleButton value={-1} aria-label="centered">
              <ArrowDropDown />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default OrderDirSelect;
import { Pagination } from '@material-ui/lab';
import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/actions/searchparams';
import { SearchParams } from '../../redux/reducers/searchparams';
import { SearchResult } from '../../redux/reducers/searchresult';
import { AppState } from '../../redux/store';

const Pager : React.FunctionComponent = () => {

    const searchResult : SearchResult | null = useSelector((state : AppState) => state.searchResult);
    const searchParams : SearchParams = useSelector((state : AppState) => state.searchParams);
    const dispatch : Dispatch<any> = useDispatch();

    const [localPage, setLocalPage] = useState(1);

    function handleChange(event: React.ChangeEvent<any>, value: number) {
        dispatch(setPage(value));
        setLocalPage(value);
    };

    return (
        <Pagination count={searchResult?.pages} page={searchParams.page} onChange={handleChange} color="primary" />
    );
};
export default Pager;
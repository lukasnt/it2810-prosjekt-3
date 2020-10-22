import React, { useEffect, useState } from 'react';
import MovieGrid from './moviegrid';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../utils/store';
import './index.css';
import {CircularProgress} from '@material-ui/core';
import { User } from '../utils/reducers/user';
import { postData } from '../utils/ajax';
import { Dispatch } from '@reduxjs/toolkit';
import { setUser } from '../utils/actions/users';

const FavoritesPage : React.FunctionComponent = () => {

    const user : User | null = useSelector((state : AppState) => state.user);
    const dispatch : Dispatch<any> = useDispatch();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetch("http://localhost:8080/api/user/", {
                headers: {
                    'Authorization': user.token
                  }
            })
            .then(res => res.json())
            .then(data => {
                dispatch(setUser(data));
            })
        }
    }, []);

    return (
        <div className="moviePage">
            <MovieGrid data={ user == null ? [] : user.favorites }/>
        </div>
    );
};

export default FavoritesPage;
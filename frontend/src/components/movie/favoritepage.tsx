import React, { useEffect, useState } from 'react';
import MovieGrid from './moviegrid';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import './index.css';
import { Dispatch } from '@reduxjs/toolkit';
import { User } from '../../redux/reducers/user';
import { AppState } from '../../redux/store';
import { setUser } from '../../redux/actions/users';

const FavoritesPage : React.FunctionComponent = () => {

    const user : User | null = useSelector((state : AppState) => state.user);
    const dispatch : Dispatch<any> = useDispatch();

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
                localStorage.setItem("user", JSON.stringify(data));
            })
        }
    }, []);

    return (
        <div className="favoritePage">
            {user?.favorites.length == 0 ? (
                <Typography variant="h6" style={{margin: "auto", marginTop: "20%"}}>No favorites added</Typography>
            ) : (
                <MovieGrid data={user == null ? [] : user.favorites}/>
                )
            }
        </div>
    );
};

export default FavoritesPage;
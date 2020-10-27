import {MenuItem} from '@material-ui/core';
import { Dispatch } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setUser } from '../../redux/actions/users';
import { User } from '../../redux/reducers/user';
import { AppState } from '../../redux/store';
import { postData } from '../../utils/ajax';

const Logout : React.FunctionComponent = () => {
    
    const user : User | null = useSelector((state : AppState) => state.user);
    const dispatch : Dispatch<any> = useDispatch();

    const [redirect, setRedirect] = useState(false);
    
    function logout() : void {
        postData("http://localhost:8080/api/user/logout", {}, user?.token)
            .then(res => {
                setRedirect(true);
                dispatch(setUser(null));
                localStorage.setItem("user", JSON.stringify(null));
            })
            .catch(error => {
                console.log("Couldn't log out");
            })
    }

    return (
        <MenuItem data-cy='logout_button' onClick={logout}>
            Log out
            {redirect ? <Redirect to="/login"/> : null}
        </MenuItem>
    );
};

export default Logout;

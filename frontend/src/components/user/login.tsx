import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { Dispatch } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { Redirect } from 'react-router-dom';
import { User } from '../../redux/reducers/user';
import { AppState } from '../../redux/store';
import { postData } from '../../utils/ajax';
import { setUser } from '../../redux/actions/users';

const Login : React.FunctionComponent = () => {
    
    const user : User | null = useSelector((state : AppState) => state.user);
    const dispatch : Dispatch<any> = useDispatch();
    
    const [errorTxt, setErrorTxt] = useState("");
    const [redirect, setRedirect] = useState(false);
    
    function login() : void {
        const email : string = (document.getElementById("lEmail") as HTMLInputElement).value;
        const password : string = (document.getElementById("lPassword") as HTMLInputElement).value;

        const data : any = {
            email: email,
            password: password
        };

        postData("http://localhost:8080/api/user/login", data)
            .then(res => {
                if (res.status == 403) {  // Forbidden (i.e wrong username/password)
                    console.log("Not Correct username and password combination");
                    setErrorTxt("Not Correct username and password combination");
                    throw Error(res.statusText);
                }
                return res.json()
            })
            .then(data => {
                dispatch(setUser({
                    email: email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    token: data.authToken,
                    favorites: data.favorites
                }));
                setErrorTxt("");
                setRedirect(true);
            }).catch(error => {});
    }

    return (
        <Paper className="login">
            <TextField required id="lEmail" label="Email" variant="outlined"/>
            <TextField required id="lPassword" type="password" label="Password" variant="outlined"/>
            <Button variant="contained" color="primary" onClick={login}> Login </Button>
            <Typography color="secondary"> {errorTxt} </Typography>
            {redirect ? <Redirect to="/" /> : null}
        </Paper>
    );
};

export default Login;

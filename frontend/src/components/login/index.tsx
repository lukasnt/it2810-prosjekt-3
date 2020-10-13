import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { Dispatch } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../utils/ajax';
import { AppState, setUser, User } from '../utils/store';
import './index.css';

const Login : React.FunctionComponent = () => {
    
    const user : User | null = useSelector((state : AppState) => state.user);
    const dispatch : Dispatch<any> = useDispatch();
    
    const [errorTxt, setErrorTxt] = useState("");
    
    function login() : void {
        const email : string = (document.getElementById("lEmail") as HTMLInputElement).value;
        const password : string = (document.getElementById("lPassword") as HTMLInputElement).value;

        const data : any = {
            email: email,
            password: password
        };

        postData("http://localhost:8080/api/user/login", data)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                dispatch(setUser({
                    email: email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    token: data.authToken
                }));
                console.log(user);
                setErrorTxt("");
            })
            .catch(error => {
                console.log("Not Correct username and password combination");
                setErrorTxt("Not Correct username and password combination");
            });
    }

    return (
        <Paper className="login">
            <TextField required id="lEmail" label="Email" variant="outlined"/>
            <TextField required id="lPassword" type="password" label="Password" variant="outlined"/>
            <Button variant="contained" color="primary" onClick={login}> Login </Button>
            <Typography color="secondary"> {errorTxt} </Typography>
        </Paper>
    );
};

export default Login;

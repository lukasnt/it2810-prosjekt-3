import { Button, Paper, TextField } from '@material-ui/core';
import React from 'react';
import { postData } from '../utils/ajax';
import './index.css';

const Login : React.FunctionComponent = () => {

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
                fetch("http://localhost:8080/api/user/123");
            });
    }

    return (
        <Paper className="login">
            <TextField required id="lEmail" label="Email" variant="outlined"/>
            <TextField required id="lPassword" type="password" label="Password" variant="outlined"/>
            <Button variant="contained" color="primary" onClick={login}> Login </Button>
        </Paper>
    );
};

export default Login;

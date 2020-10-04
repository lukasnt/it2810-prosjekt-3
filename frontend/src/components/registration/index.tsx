import { Button, Paper, TextField } from '@material-ui/core';
import React from 'react';
import './index.css';

const Registration : React.FunctionComponent = () => {
  
  function register() : void {
    const email : string = (document.getElementById("email") as HTMLInputElement).value;
    const firstName : string = (document.getElementById("firstName") as HTMLInputElement).value;
    const lastName : string = (document.getElementById("lastName") as HTMLInputElement).value;
    const password : string = (document.getElementById("password") as HTMLInputElement).value;
    const confirmPassword : string = (document.getElementById("confirmPassword") as HTMLInputElement).value;

    const data = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      confirmPassword: confirmPassword
    };
    console.log(JSON.stringify(data));

    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        //'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    }).then(response => {
      console.log(response);
    });
  }

  return (
      <Paper className="registration">
        <TextField required id="email" label="Email" variant="outlined"/>
        <TextField required id="firstName" label="First Name" variant="outlined"/>
        <TextField required id="lastName" label="Last Name" variant="outlined"/>
        <TextField required id="password" label="Password" variant="outlined" type="password"/>
        <TextField required id="confirmPassword" label="Confirm Password" variant="outlined" type="password"/>
        <Button variant="contained" color="primary" onClick={register}> Register </Button>
      </Paper>
  );
}

export default Registration;

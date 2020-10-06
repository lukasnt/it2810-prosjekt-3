import { Button, Paper, TextField } from '@material-ui/core';
import React from 'react';
import { postData } from '../utils/ajax';
import './index.css';

const Registration : React.FunctionComponent = () => {
  
  function register() : void {
    const email : string = (document.getElementById("rEmail") as HTMLInputElement).value;
    const firstName : string = (document.getElementById("rFirstName") as HTMLInputElement).value;
    const lastName : string = (document.getElementById("rLastName") as HTMLInputElement).value;
    const password : string = (document.getElementById("rPassword") as HTMLInputElement).value;
    const confirmPassword : string = (document.getElementById("rConfirmPassword") as HTMLInputElement).value;

    const data : any = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      confirmPassword: confirmPassword
    };
    console.log(JSON.stringify(data));

    postData("http://localhost:8080/api/user/register", data)
      .then(res => console.log(res));
  }

  return (
      <Paper className="registration">
        <TextField required id="rEmail" label="Email" variant="outlined"/>
        <TextField required id="rFirstName" label="First Name" variant="outlined"/>
        <TextField required id="rLastName" label="Last Name" variant="outlined"/>
        <TextField required id="rPassword" label="Password" variant="outlined" type="password"/>
        <TextField required id="rConfirmPassword" label="Confirm Password" variant="outlined" type="password"/>
        <Button variant="contained" color="primary" onClick={register}> Register </Button>
      </Paper>
  );
}

export default Registration;

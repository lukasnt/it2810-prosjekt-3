import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { postData } from '../utils/ajax';
import './index.css';

const Registration : React.FunctionComponent = () => {
  
  const [errorTxt, setErrorTxt] = useState("");
  const [redirect, setRedirect] = useState(false);

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

    postData("http://localhost:8080/api/user/register", data)
      .then(res => {
        if (res.status == 403) {  // Forbidden (i.e wrong username/password)
          console.log("Not Correct combination");
          setErrorTxt("Not Correct combination");
          throw Error(res.statusText);
        } else{
          setErrorTxt("");
          setRedirect(true);
        }
      }).catch(error => {});;
  }

  return (
      <Paper className="registration">
        <TextField required id="rEmail" label="Email" variant="outlined"/>
        <TextField required id="rFirstName" label="First Name" variant="outlined"/>
        <TextField required id="rLastName" label="Last Name" variant="outlined"/>
        <TextField required id="rPassword" label="Password" variant="outlined" type="password"/>
        <TextField required id="rConfirmPassword" label="Confirm Password" variant="outlined" type="password"/>
        <Button variant="contained" color="primary" onClick={register}> Register </Button>
        <Typography color="secondary"> {errorTxt} </Typography>
        {redirect ? <Redirect to="/login" /> : null}
      </Paper>
  );
};

export default Registration;

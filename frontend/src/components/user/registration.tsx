import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { postData } from '../../utils/ajax';
import './index.css';

const Registration : React.FunctionComponent = () => {
  
  const [errorTxt, setErrorTxt] = useState("");
  const [redirect, setRedirect] = useState(false);

  // Posts the values in the text-fields to the backend
  function register() : void {
    // Gets the values from the text-fields
    const email : string = (document.getElementById("rEmail") as HTMLInputElement).value;
    const firstName : string = (document.getElementById("rFirstName") as HTMLInputElement).value;
    const lastName : string = (document.getElementById("rLastName") as HTMLInputElement).value;
    const password : string = (document.getElementById("rPassword") as HTMLInputElement).value;
    const confirmPassword : string = (document.getElementById("rConfirmPassword") as HTMLInputElement).value;

    // The data to be posted
    const data : any = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      confirmPassword: confirmPassword
    };

    // sends the post call
    postData("http://localhost:8080/api/user/register", data)
      .then(res => {
        if (res.status === 403) {  // Forbidden (i.e wrong username/password)
          console.log("Not Correct combination");
          setErrorTxt("Not Correct combination");
          throw Error(res.statusText);
        } else{
          setErrorTxt("");
          setRedirect(true);
        }
      }).catch(() => {});
  }

  return (
    <Paper className="registration">
      <TextField required data-cy='register_email' id="rEmail" label="Email" variant="outlined"/>
      <TextField required data-cy='register_first_name' id="rFirstName" label="First Name" variant="outlined"/>
      <TextField required data-cy='register_last_name' id="rLastName" label="Last Name" variant="outlined"/>
      <TextField required data-cy='register_password' id="rPassword" label="Password" variant="outlined" type="password"/>
      <TextField required data-cy='register_confirm_password' id="rConfirmPassword" label="Confirm Password" variant="outlined" type="password"/>
      <Button data-cy='register_register' variant="contained" color="primary" onClick={register}> Register </Button>
      <Typography color="error"> {errorTxt} </Typography>
        {redirect ? <Redirect to="/login" /> : null}
    </Paper>
  );
};

export default Registration;

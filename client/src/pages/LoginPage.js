import { TextField, Grid, Typography, FormControlLabel, Checkbox, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { emailValidator, passwordValidator } from '../service/validator';
import "../style/authen.css"

import React from 'react'
import logo from '../components/images/black_logo.png'
const LoginPage = () => {
    const [LoginForm, setLoginForm] = useState({
        email: "",
        password: "",
      });
      const handleInputChange = event => {
        const { name, value } = event.target;
        setLoginForm({ ...LoginForm, [name]: value });
      };
      const Login = () => {
          if(emailValidator(LoginForm.email)&& passwordValidator(LoginForm.password))
          {
            var login_form = {
                email: LoginForm.email,
                password: LoginForm.password,
              };
              console.log(login_form)
          }
        // handleSubmit.create(data)
        //   .then(response => {
        //     setSubmitted(true);
        //     console.log(response.data);
        //   })
        //   .catch(e => {
        //     console.log(e);
        //   });
      };
  return (
        <Grid container className="body-login">
               <Grid item xs={10} md={4}> 
                    <Grid container className='login-form'>
                        <Grid item xs={12} justifyContent="center" className='header-login'>
                            <img src={logo} alt="" srcSet="" className='logo'/>
                        </Grid>
                        <Grid item xs={12} className='header-login'>
                            <Typography variant='h5' fontWeight="fontWeightBold">Login</Typography>
                        </Grid>
                        {/* <Grid item xs={12}>
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            />
                        </Grid> */}
                        <Grid xs={12} className="form-input">
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                size="small"
                                onChange={handleInputChange}
                                />
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            size="small"
                            onChange={handleInputChange}
                            />
                            <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            />
                        </Grid>
                        <Grid container justifyContent="center">
                            <Grid xs={4}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 1, mb: 2 }}
                                onClick={Login}
                                >
                                Sign In
                            </Button>
                            
                            </Grid>
                            <Grid xs={12} className="register-link" >
                                <Link to="/register" >
                                Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
               </Grid>
        </Grid>
  )
}

export default LoginPage
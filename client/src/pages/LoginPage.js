import { TextField, Grid, Typography, FormControlLabel, Checkbox, Button, Stack } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import {  useState } from 'react';
import handleApi from '../service/handleApi';
import { emailValidator, passwordValidator } from '../service/validator';
import "../style/authen.css"
import { useNavigate } from 'react-router-dom';
import React from 'react'
import logo from '../components/images/black_logo.png'
const LoginPage = ({isLoggedIn, setIsLoggedIn}) => {
    const navigate = useNavigate();

    const [LoginForm, setLoginForm] = useState({
        email: "",
        password: "",
      });
    const [LoginStatus, setLoginStatus] = useState(true);
      const handleInputChange = event => {
        const { name, value } = event.target;
        setLoginForm({ ...LoginForm, [name]: value });
      };
      const Login = (e) => {
          e.preventDefault()
          if(emailValidator(LoginForm.email)&& passwordValidator(LoginForm.password))
          {
            var login_form = {
                email: LoginForm.email,
                password: LoginForm.password,
              };
              handleApi.login(login_form).then(response =>{
                  if(response.data.token){
                     localStorage.setItem("token", JSON.stringify(response.data.token))
                     localStorage.setItem("userid", JSON.stringify(response.data.userId))
                     localStorage.setItem("roleId", JSON.stringify(response.data.roleId))
                     console.log(response.data)
                     setIsLoggedIn(true)
                     setLoginStatus(true)
                  }
                  return response.data;
              }).catch(e => {
                setLoginStatus(false)
            });
          }
      };
  if(!isLoggedIn){
  return (
        <Grid container className="body-login" component="form" onSubmit={Login}>

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
                            <Link to={'/accounts/forgot-password'}>Forgot password</Link>
                        </Grid>
                        <Grid container justifyContent="center">
                            <Stack alignItems={"center"}>
                                {
                                !LoginStatus &&(
                                <Typography style={{ color: "red" }}>
                                    Wrong email or password! Please try again!
                                </Typography>)
                            }
                            <Grid >
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 1, mb: 2 }}
                                    >
                                    Sign In
                                </Button>
                            
                            </Grid>
                            </Stack>
                            
                            
                        </Grid>
                    </Grid>
               </Grid>
 
        </Grid>
  )
}else{
    return <Navigate to="/topics"></Navigate>
}
}
export default LoginPage
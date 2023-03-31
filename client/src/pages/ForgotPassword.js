import React from 'react'
import { Grid, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';
import handleApi from '../service/handleApi';
const ForgotPassword = () => {
    const [email, setEmail] = useState({
        email: ''
    });
    const [send, setSend] = useState(false);
    const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    handleApi.forgotPassword(email).then(response=>{
        console.log(response)
        setSend(true)
        setError('')
    }).catch(error=>{
      console.log(error)
      setSend(false)
        setError(error.response.data.err)
    })
  };
  const emailOnchange=(event)=>{
    setEmail({
        ...email,
        email: event.target.value
      });
  }
  return (
    <Grid container className='container_auth' spacing={2} sx={{ height: '100vh' }}>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={2} maxWidth="sm">
          <Grid item xs={12}>
            <Typography variant="h4">Forgot Password</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Please enter the email associated with your account and we will send you a password reset link.
            </Typography>
          </Grid>
          {
              send && (
                <Grid item xs={12}>
                <Typography>
                  Reset link was sent to this email.
                </Typography>
              </Grid>
              )
          }
          {
            error.length>0 && (
                <Grid item xs={12}>
                <Typography>
                 {error}
                </Typography>
              </Grid>
            )   
          }
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                type="email"
                value={email.email}
                onChange={emailOnchange}
              />
              <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                Reset Password
              </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ForgotPassword

import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Typography } from '@mui/material';
import handleApi from '../service/handleApi';
import { Link } from 'react-router-dom';
const ResetPassword = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const [sent,setSent]= useState(false)
    const navigate = useNavigate();
    const [password, setPassword] = useState({
        password: '',
        cPassword: ''
    });

    const [error, setError] = useState('');
    useEffect(()=>{
        handleApi.get_resetEmail(token).then(response=>{
            console.log(response.data)
        })
    })
    const handleChangePassword=(event)=>{
        const { name, value } = event.target;
        setPassword({ ...password, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.password === password.cPassword) {
          console.log(`Submitted password: ${password}`);
          handleApi.post_resetEmail(token, password).then(response=>{
            setSent(true)
            console.log(response.data)
          })
          setError('');
        } else {
          setError('Passwords do not match');
        }
      };
  return (
    <Grid container className='container_auth' spacing={2} sx={{ height: '100vh' }}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={2} maxWidth="sm">
          <Grid item xs={12}>
            <Typography variant="h4">Reset Password</Typography>
          </Grid>
          {
              sent &&(
                <Grid item xs={12}>
                    <Typography variant="p1">Reset Successfully <Link to={'/login'}> Back to login</Link></Typography>
                </Grid>
              )
          }
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                id="password"
                label="New Password"
                type="password"
                name='password'
                value={password.password}
                onChange={handleChangePassword}
              />
              <TextField
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                error={error.length > 0 ? error : ''}
                helperText={error}
                type="password"
                name='cPassword'
                value={password.cPassword}
                onChange={handleChangePassword}
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

export default ResetPassword
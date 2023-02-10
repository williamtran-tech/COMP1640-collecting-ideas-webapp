import React from 'react'

import Grid from '@mui/material/Grid';
import logo from './images/black_logo.png'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import '../style/navbar.css'
const Navbar = () => {
    return (

            <Grid container spacing={2}>
                <Grid className='navbar-item' item xs={6} md={3} >
                    <div className='item'>
                        <img className ='logo' src={logo} alt="" />
                    </div>
                </Grid>
                <Grid className='navbar-item' item xs={6} md={9}>           
                    <div className='item-right'>
                    <Badge badgeContent={4} color="error">
                        <Link to='/user'>
                           <MailIcon color="primary"/>
                        </Link>
                    </Badge>
                    <Link to='/user'>
                           <AccountCircleIcon color="primary"/>
                    </Link>
                    </div>
                </Grid>
            </Grid>
      
    )
}

export default Navbar
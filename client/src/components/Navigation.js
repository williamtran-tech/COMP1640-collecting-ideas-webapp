import React from 'react'

import Grid from '@mui/material/Grid';
import logo from './images/black_logo.png'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import '../style/navbar.css'
import { IconButton } from '@mui/material';
const Navbar = () => {
    return (

            <Grid container spacing={2}>
                <Grid className='navbar-item' item xs={6} md={3} >
                    <Link to="/">
                    <div className='item'>
                        <img className ='logo' src={logo} alt="" />
                    </div>
                    </Link>
                </Grid>
                <Grid className='navbar-item' item xs={6} md={9}>           
                    <div className='item-right'>
                   
                        <Link to='/user'> 
                            <IconButton>
                                <Badge badgeContent={4} color="error">
                                    <MailIcon color="primary"/>
                                </Badge>
                            </IconButton>
                        </Link>
                    
                    <Link to='/user'>
                        <IconButton>
                            <AccountCircleIcon color="primary"/>
                        </IconButton>
                    </Link>
                    </div>
                </Grid>
            </Grid>
      
    )
}

export default Navbar
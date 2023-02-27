import React from 'react'

import Grid from '@mui/material/Grid';
import logo from './images/logo.png'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import '../style/navbar.css'
import { IconButton } from '@mui/material';

const Navbar = ({isLoggedIn, setIsLoggedIn}) => {
    const navigate= useNavigate()
    const logout= ()=>{
        // navigate("/login")
        localStorage.clear()
        setIsLoggedIn(false)
    }
    return (
            <Grid container spacing={2} className="nav-container">
                <Grid className='navbar-item' item xs={6} md={3} >
                    <Link to="/">
                            <img className ='logo' src={logo} alt="" />
                    </Link>
                </Grid>
                <Grid className='navbar-item' item xs={6} md={9}>           
                    <div className='item-right'>
                            <IconButton onClick={logout}>
                                <Badge badgeContent={4} color="error">
                                    <MailIcon className='icon'/>
                                </Badge>
                            </IconButton>
                    <Link to='/login'>
                        <IconButton>
                            <AccountCircleIcon className='icon'/>
                        </IconButton>
                    </Link>
                    </div>
                </Grid>
            </Grid>
      
    )
}

export default Navbar
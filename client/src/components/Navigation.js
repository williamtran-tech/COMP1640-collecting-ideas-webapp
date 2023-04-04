import React from 'react'

import Grid from '@mui/material/Grid';
import logo from './images/logo.png'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import '../style/navbar.css'
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ChangeCircleSharpIcon from '@mui/icons-material/ChangeCircleSharp';
import checkToken from '../service/checkToken';

const Navbar = ({isLoggedIn, setIsLoggedIn}) => {
    const navigate= useNavigate()
    const decodedToken = checkToken()
    const logout= () => {
        navigate("/login")
        localStorage.clear()
        setIsLoggedIn(false)
    }
    const viewAs= () => {
        navigate("/")
    }
    return (
            <Grid container spacing={2} className="nav-container">
                <Grid className='navbar-item' item xs={6} md={3} >
                    <Link to="/topics">
                            <img className ='logo' src={logo} alt="" />
                    </Link>
                </Grid>
                <Grid className='navbar-item' item xs={6} md={9}>           
                    <div className='item-right'>
                           
                    {
                        decodedToken&&decodedToken.roleId ===1&&(
                            <Link to='/user'>
                                <IconButton>
                                    <AccountCircleIcon className='icon'/>
                                </IconButton>
                            </Link>
                        )
                    }
                    {
                        decodedToken&&decodedToken.roleId !=1&&(
                            <IconButton onClick={viewAs}>
                                {/* <Badge badgeContent={4} color="error">
                                    <MailIcon className='icon'/>
                                </Badge> */}
                                <ChangeCircleSharpIcon className='icon'></ChangeCircleSharpIcon>
                            </IconButton>
                        )
                    } 
                    <IconButton onClick={logout}>
                                <LogoutIcon className='icon'></LogoutIcon>
                    </IconButton>
                    </div>
                </Grid>
            </Grid>
    )
}
export default Navbar
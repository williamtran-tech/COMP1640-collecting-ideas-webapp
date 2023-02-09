import React from 'react'
import '../Header.css'
import { AccountCircle } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Forum } from '@mui/icons-material'

const Header = () => {
    return (
        <div className='header'>
            <IconButton>
                <AccountCircle fontSize="large" className='header_icon'></AccountCircle>
            </IconButton>
            <img className='header_logo' src='logo192.png' alt='header'></img>
            <IconButton>
                <Forum fontSize="large" className='header_icon'></Forum>
            </IconButton>
        </div>
    )
}

export default Header
import React, { useState } from 'react';

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import UsersTable from './UsersTable';
import { Paper, Typography } from '@mui/material';
import '../../style/userManagement.css'
const UserManagement= () => {
return(
    <>
    <Paper className='header_admin'>
          <Typography> Topic Management</Typography>
    </Paper>
    <Paper>
        <UsersTable></UsersTable>
    </Paper>
    
    </>
    
)
};

export default UserManagement;
import React, { useState } from 'react';

import UsersTable from './UsersTable';
import { Button, Paper,  Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import '../../style/userManagement.css'
import CreateUserForm from './CreateUserForm';
const UserManagement= () => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => {
        setOpenModal(true);
      };
return(
    <>
    <Paper className='header_admin'>
          <Typography> Topic Management</Typography>
            <Button variant="contained" startIcon={<AddIcon  />}  onClick={handleOpen}>
              New User
          </Button>
    </Paper>

    <Paper className='table_user'>
        <UsersTable openModal={openModal} setOpenModal={setOpenModal}></UsersTable>
    </Paper>
    </>
    
)
};

export default UserManagement;
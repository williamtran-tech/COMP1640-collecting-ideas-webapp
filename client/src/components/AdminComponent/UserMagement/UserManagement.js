import React, { useEffect, useState } from 'react';

import UsersTable from './UsersTable';
import { Button, Paper,  Typography } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import '../../../style/userManagement.css'
const UserManagement= () => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => {
        setOpenModal(true);
      };
return(
    <>
    <Paper className='header_admin'>
          <Typography> Topic Management</Typography>
            <Button variant="contained" startIcon={<AddIcon/>} className='create_user_btn' onClick={handleOpen}>
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
import React, { useEffect, useState } from 'react';

import UsersTable from './UsersTable';
import { Button, Paper,  Typography } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import '../../../style/userManagement.css'
import checkToken from '../../../service/checkToken';
const UserManagement= () => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => {
        setOpenModal(true);
      };
    const token =checkToken()
return(
    <>
    <Paper className='header_admin'>
          <Typography> Topic Management</Typography>
          {(token&&token.roleId===3 || token.roleId===4) &&(
          <Button variant="contained" startIcon={<AddIcon/>} className='create_user_btn' onClick={handleOpen}>
              New User
          </Button>)}

    </Paper>

    <Paper className='table_user'>
        <UsersTable openModal={openModal} setOpenModal={setOpenModal}></UsersTable>
    </Paper>
    </>
)
};
export default UserManagement;
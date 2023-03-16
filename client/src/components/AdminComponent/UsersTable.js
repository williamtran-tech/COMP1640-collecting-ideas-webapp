import React, { useEffect } from 'react'
import {Drawer, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button } from '@mui/material';
import { useState } from 'react';
import handleApi from '../../service/handleApi';
import UserProfile from './UserProfile';
import CreateUserForm from './CreateUserForm';
import DeleteUserModal from './DeleteUserModal';
const UsersTable = ({openModal,setOpenModal}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sumited, setSumited] = useState(false)

  const [listUsers, setListUsers]=useState([])
  useEffect(()=>{
     
      get_user_table()
  },[sumited]) 
  const get_user_table=()=>{
          handleApi.admin_get_uset_inf().then(
          response =>{
              console.log(response.data)
              setListUsers(response.data)
          }
      )
      }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userInf, setUserInf]= useState(null);

  const handleOpenDrawer = (id) => {
      if(listUsers && listUsers.users){
           const user = listUsers.users.find(user => user.id === id);
            setUserInf(user);
            setOpenDrawer(true);
      }
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const [openDelete, setOpenDelete] = useState(false)
  const [idDelete, setIdDelete] = useState()
  const handleOpenModal =(id) =>{
    setIdDelete(id)
    setOpenDelete(true)
  }
  return (
    <>
    <TableContainer >
    <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          count={listUsers&& listUsers.users&&listUsers.users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          component="div"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
    />
      <Table size="small" aria-label="a dense table" className='table_user' >
        <TableHead >
          <TableRow className='ideas_list'>
            <TableCell>ID</TableCell>
            <TableCell>User profile</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align='center'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listUsers&& listUsers.users&&listUsers.users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
            <TableRow key={user.id}>
                <TableCell >{user.id}</TableCell>
              <TableCell >
                  <div className='user_infor'>
                      <Avatar src={user.profileImage} />
                        <div>
                            <div className='user_name'>{user.fullName}</div>
                            <div className='user_email'>{user.email}</div>
                        </div>
                  </div>
                
              </TableCell>
              
              <TableCell>{user.Department.name}</TableCell>
              <TableCell>{user.Role.name}</TableCell> 
              <TableCell className={user.isVerified  ? 'active' : 'inactive'}>
              {user.isVerified ? 'Active' : 'Inactive'}
              </TableCell>
              <TableCell align='center'>
                <Button onClick={()=>{handleOpenDrawer(user.id)}}>Edit</Button>
                <Button >Ban</Button>
                <Button onClick={()=>{handleOpenModal(user.id)}}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Drawer anchor='right' open={openDrawer} onClose={handleCloseDrawer}>
        <UserProfile userInf={userInf} department={listUsers.departments} role={listUsers.roles}></UserProfile>
    </Drawer> 
    <CreateUserForm openModal={openModal} setOpenModal={setOpenModal} department={listUsers.departments} role={listUsers.roles}></CreateUserForm>
    <DeleteUserModal openDelete={openDelete} setOpenDelete={setOpenDelete} id={idDelete} setSumited={setSumited} sumited={sumited}> </DeleteUserModal>
    </>
  )
}

export default UsersTable
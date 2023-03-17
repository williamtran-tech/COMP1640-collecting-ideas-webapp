import React, { useEffect } from 'react'
import {Drawer, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import handleApi from '../../../service/handleApi';
import UserProfile from './UserProfile';
import CreateUserForm from './CreateUserForm';
import DeleteUserModal from './DeleteUserModal';
import '../../../style/userManagement.css'
const UsersTable = ({openModal,setOpenModal}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [submited, setSubmited] = useState(false)
  const [listUsers, setListUsers]=useState([])
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  useEffect(()=>{
      get_user_table()

  },[submited, statusFilter]) 
  
  
  const handleStatusFilterChange = (event, newFilter) => {
    setStatusFilter(newFilter);
  };
  const get_user_table=()=>{
          handleApi.admin_get_uset_inf().then(
          response =>{
              console.log(response.data)
              setListUsers(response.data)
          }
      )
      }
      useEffect(() => {
        if (listUsers && listUsers.users) {
          setFilteredUsers(
            listUsers.users.filter(user => {
              if (statusFilter === 'active') {
                return user.isVerified;
              } else if (statusFilter === 'inactive') {
                return !user.isVerified;
              } else {
                return true;
              }
            })
          );
        }
      }, [submited, statusFilter, listUsers]);
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


  // const users = listUsers && listUsers.users;
  // const filteredUsers = users && users.filter((user) => {
  //   if (statusFilter === 'active') {
  //     return user.isVerified;
  //   } else if (statusFilter === 'inactive') {
  //     return !user.isVerified;
  //   } else {
  //     return true;
  //   }
  // });


  return (
    <>
    <Tabs
      value={statusFilter}
      onChange={handleStatusFilterChange}
      indicatorColor="primary"
      textColor="primary"
      className='filter_user'
    >
      <Tab label="All" value="all" />
      <Tab label="Active" value="active" />
      <Tab label="Inactive" value="inactive" />
    </Tabs>
    <TableContainer >
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
          {filteredUsers&& filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
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
                <Button size ='small'  onClick={()=>{handleOpenDrawer(user.id)}}>Edit</Button>
                <Button size ='small'  >Ban</Button>
                <Button size ='small'  onClick={()=>{handleOpenModal(user.id)}}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          count={filteredUsers&&filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          component="div"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </TableContainer>
    <Drawer anchor='right' open={openDrawer} onClose={handleCloseDrawer} >
        <UserProfile userInf={userInf} department={listUsers.departments} role={listUsers.roles} setOpenDrawer={setOpenDrawer} setSubmited={setSubmited} submited={submited}></UserProfile>
    </Drawer> 
    <CreateUserForm openModal={openModal} setOpenModal={setOpenModal} department={listUsers.departments} role={listUsers.roles} setSubmited={setSubmited} submited={submited}></CreateUserForm>
    <DeleteUserModal openDelete={openDelete} setOpenDelete={setOpenDelete} id={idDelete} setSubmited={setSubmited} submited={submited}> </DeleteUserModal>
    </>
  )
}

export default UsersTable
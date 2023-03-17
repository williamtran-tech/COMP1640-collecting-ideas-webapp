import React from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { MenuItem, Stack } from '@mui/material';
import handleApi from '../../../service/handleApi';
import { Typography } from '@material-ui/core';
const CreateUserForm = ({openModal, setOpenModal, department, role, setSubmited, submited}) => {
    const initialFormState = {
        fullName: '',
        email: '',
        departmentId: '',
        roleId: ''
      };
      const [user, setUser] = useState(initialFormState);
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };
     
      const handleClose = () => {
        setOpenModal(false);
        setUser(initialFormState);
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        handleApi.admin_create_user(user).then(
            response =>{
                console.log(response.data)
                setSubmited(!submited)
            }
        )
        setOpenModal(false);
        setUser(initialFormState);
      };
  return (
    <>
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ 
        position: 'absolute',
        bgcolor: 'white',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,}}>
          <div className='titleform'>
            <Typography variant="h5" fontWeight="light">
              Create new user
            </Typography>
          </div>
          <form onSubmit={handleSubmit} className='form_create_user'>
                <TextField
                  label="Full Name"
                  type="text"
                  pattern="[A-Za-z ]+"
                  title="Please enter alphabetic characters and spaces only"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  inputmode="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address"
                  value={user.email}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <Stack direction={'row'}>
 <TextField
                  label="Department"
                  variant="outlined"
                  select
                  name="departmentId"
                  value={user.departmentId}
                  onChange={handleInputChange}
                  required
                  fullWidth
                >
                  {department &&
                    department.map((department) => (
                      <MenuItem key={department.id} value={department.id}>
                        {department.name}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField
                  label="Role"
                  variant="outlined"
                  select
                  name="roleId"
                  value={user.roleId}
                  onChange={handleInputChange}
                  required
                  fullWidth
                >
                  {role &&
                    role.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                </TextField>
                </Stack>
               <div className='action_user_form'>
                 <Button type="submit" variant="contained">
                  Create User
                </Button>
                <Button onClick={handleClose} variant="contained" className='cancle_btn' >
                  Cancel
                </Button>
               </div>
                
          </form>
      </Box>
    </Modal>
  </>
  )
}

export default CreateUserForm
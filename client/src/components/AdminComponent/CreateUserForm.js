import React from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { MenuItem } from '@mui/material';
import handleApi from '../../service/handleApi';
const CreateUserForm = ({openModal, setOpenModal, department, role}) => {
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
      aria-labelledby="create-user-modal"
    >
      <Box sx={{ bgcolor: 'white', p: 2 }}>
      <form onSubmit={handleSubmit}>
      <TextField
        label="Full Name"
        type="text"
        pattern="[A-Za-z ]+"
        title="Please enter alphabetic characters and spaces only"
        name="fullName"
        value={user.fullName}
        onChange={handleInputChange}
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
        required
      />
      <TextField
        label="Department"
        variant="outlined"
        fullWidth
        select
        name="departmentId"
        value={user.departmentId}
        onChange={handleInputChange}
        required
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
        fullWidth
        select
        name="roleId"
        value={user.roleId}
        onChange={handleInputChange}
        required
      >
        {role &&
          role.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
      </TextField>
      <Button type="submit" variant="contained">
        Create User
      </Button>
      <Button onClick={handleClose} variant="contained">
        Cancel
      </Button>
</form>
      </Box>
    </Modal>
  </>
  )
}

export default CreateUserForm
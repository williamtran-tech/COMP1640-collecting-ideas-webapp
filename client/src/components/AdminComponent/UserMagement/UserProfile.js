import React, { useState } from 'react'
import { Avatar, TextField, Typography , Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Stack } from '@mui/material';
import handleApi from '../../../service/handleApi';
const UserProfile = ({userInf, department, role, setOpenDrawer, setSubmited, submited, setOpenSnackBar}) => {
    console.log(userInf)
    const [user, setUser]= useState({
        fulleName: userInf.fullName,
        email: userInf.email,
        departmentId: userInf.Department.id,
        roleId: userInf.Role.id,
        file: null
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };
    const handleUpdateUser=(event) =>{
      event.preventDefault()
      const formData = new FormData();
      formData.append("name", user.fulleName);
      formData.append("departmentId", user.departmentId);
      formData.append("roleId",user.roleId);
      formData.append("file", user.file);
      formData.append("email", userInf.email);
      formData.append("password", userInf.password);
      handleApi.admin_update_user(userInf.id,formData).then(response =>{
        console.log(response.data)
        setOpenDrawer(false)
        setSubmited(!submited)
        setOpenSnackBar({
          status:true,
          message:"Update user successfully"
        })
      })
  }
  return (
    <div className='user_profile'>
    <Stack className="avatar_profile1">
        <Avatar                                     
        src={userInf.profileImage}
        style={{ width: 150, height: 150 }}/>
            <Typography>{userInf.fullName} </Typography>
            <Stack direction={'row'} spacing={1}>
                <Typography>{userInf.email} • 
            </Typography>
            <Typography className={userInf.isVerified  ? 'active' : 'inactive'}>
                    {userInf.isVerified ? 'Active' : 'Inactive'}
            </Typography> 
            </Stack>
    </Stack>
    <div>
    <form onSubmit={handleUpdateUser}>
      <TextField label="Name" name='fulleName' value={user.fulleName} fullWidth margin="normal" required   onChange={handleInputChange}/>
      <TextField label="Email" value={user.email} fullWidth margin="normal" required  disabled />
      <Stack direction="row" spacing={2}>
        <TextField
            label="Department"
            variant="outlined"
            fullWidth
            select
            name='departmentId'
            value={user.departmentId}
            onChange={handleInputChange}
        >
            {department&&department.map(department => (
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
        name='roleId'
        value={user.roleId}
        onChange={handleInputChange}
      >
        {role&&role.map((role) => (
          <MenuItem key={role.id} value={role.id}>
            {role.name}
          </MenuItem>
        ))}
      </TextField>
      </Stack>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
    </div>
  </div>
  )
}

export default UserProfile
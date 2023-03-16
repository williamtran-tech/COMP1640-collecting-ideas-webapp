import React, { useState } from 'react'
import { Avatar, TextField, Typography , Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Stack } from '@mui/material';
import handleApi from '../../service/handleApi';
const UserProfile = ({userInf, department, role}) => {
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
    const updateInf = () =>{
        handleApi.admin_update_user(userInf.id).then(response =>{
            console.log(response.data)
        })
    }
  return (
    <div className='user_profile'>
    <Stack className="avatar_profile">
        <Avatar                                     
        src="https://b.fssta.com/uploads/application/soccer/headshots/885.vresize.350.350.medium.14.png"
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
    <form >
      <TextField label="Name" value={user.fulleName} fullWidth margin="normal" required   onChange={handleInputChange}/>
      <TextField label="Email" value={user.email} fullWidth margin="normal" required  onChange={handleInputChange} />
      <Stack direction="row" spacing={2}>
        <TextField
            label="Department"
            variant="outlined"
            fullWidth
            select
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
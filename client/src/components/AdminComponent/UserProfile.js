import React, { useState } from 'react'
import { Avatar, TextField, Typography , Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Stack } from '@mui/material';
const UserProfile = ({userInf, department}) => {
    console.log(userInf)
    const [user, setUser]= useState({
        fulleName: userInf.fullName,
        email: userInf.email,
        departmentId: userInf.Department.name,
        roleId: userInf.Role.id,
        file: null
    })
    console.log(department)
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
      <TextField label="Name" value={user.fulleName} fullWidth margin="normal" required />
      <TextField label="Email" value={user.email} fullWidth margin="normal" required />
      <Stack direction="row" spacing={2}>
        <TextField
            label="Department"
            variant="outlined"
            fullWidth
            select
            value={1}
            // onChange={(e) => setDepartment(e.target.value)}
        >
            {/* {userInf&&userInf.Department&&userInf.Department[0].map(department => (
                <MenuItem key={department.id} value={department.id}>
                    {department.name}
                </MenuItem>
            ))} */}
        </TextField>
        <TextField
        label="Role"
        variant="outlined"
        fullWidth
        select
        // value={role}
        // onChange={(e) => setRole(e.target.value)}
      >
        {/* {roleOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))} */}
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
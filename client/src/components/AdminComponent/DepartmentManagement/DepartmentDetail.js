import React, { useEffect, useState } from 'react'
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, ListSubheader, Paper } from '@material-ui/core';
import handleApi from '../../../service/handleApi';

const DepartmentDetail = ({id}) => {
  const [departmentDetail, setDepartmentDetail] = useState([])
  useEffect(()=>{
    handleApi.admin_get_department_detail(id).then(response=>{
        setDepartmentDetail(response.data)
    })
  }, [id])
  return (
    <div>
        <Paper>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            
                            <ListSubheader component="div" id="nested-list-subheader">
                            {departmentDetail&&departmentDetail.info&&departmentDetail.info[0].name}
                            </ListSubheader>
                        }>
            {departmentDetail&& departmentDetail.users &&departmentDetail.users.map(user => (
                <ListItem key={user.id}>
                <ListItemAvatar>
                    <Avatar alt={user.fullName} src={user.profileImage} />
                </ListItemAvatar>
                <ListItemText 
                    primary={user.fullName} 
                    secondary={`Email: ${user.email}`} 
                />
                <Typography>
                    {user.role}
                </Typography>
                </ListItem>
            ))}
            </List>
            </Paper>
         
    </div>
  )
}

export default DepartmentDetail
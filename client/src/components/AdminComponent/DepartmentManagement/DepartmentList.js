import { Box, Paper, Badge, Typography, IconButton, Popover,Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BusinessIcon from '@mui/icons-material/Business';
import { Stack } from '@mui/material';
import handleApi from '../../../service/handleApi';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
const DepartmentList = ({updated, setUpdated, setId,setOpenSnackBar}) => {
    const [departments, setDepartment]= useState([])
    const [departmentSelected, setDepartmentSelected]=useState({})
    const [onpenUpdate, setOpenUpdate] = useState(false)
    const [onpenDelete, setOpenDelete] = useState(false)
    useEffect(()=>{
        handleApi.admin_get_department().then(response=>{
            console.log(response.data)
            setDepartment(response.data)
            setId(response.data.departments[0].id) 
        })
    },[updated])
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event,id, name) => {
        setDepartmentSelected({
            id: id,
            name:name, 
        })
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const hanldeOpenUpdate =()=>{
    setOpenUpdate(true)
    
    }
    const hanldeOpenDelete =()=>{
    setOpenDelete(true)
    }
    const hanldeClickDepartment =(id)=>{
        setId(id)    
    }
  return (
    <div>
        <Stack spacing={2}>
            {
                departments && departments.departments && departments.departments.map(department=>(
                <Paper className='department_container' onClick={()=>{hanldeClickDepartment(department.id)}}>
                    <Stack direction={"row"} spacing={2} className='category_name'>
                        <BusinessIcon fontSize='large'></BusinessIcon>
                        <Typography  component="div" 
                            style={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}> 
                            {department.name}
                        </Typography>
                    </Stack>
                    <div className='category_option'>
                    <Badge badgeContent={department.user_quantity} color="primary">
                                <AccountCircleIcon style={{ color: '#fefae0'}}/>
                    </Badge>
                    
                    <IconButton onClick={(event)=>{handleClick(event, department.id, department.name)}}>
                        <MoreVertIcon></MoreVertIcon>
                    </IconButton>

                    </div>
                </Paper>
                ))
            }
         <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
            ><Stack spacing={1}>
            <Button size='small' onClick={hanldeOpenUpdate}> Update</Button>
            <Button size='small' onClick={hanldeOpenDelete}> Delete</Button>
        </Stack>
        
        </Popover>
        </Stack>
        <UpdateModal onpenUpdate={onpenUpdate} setOpenUpdate={setOpenUpdate} departmentSelected={departmentSelected}  updated={updated} setUpdated={setUpdated} setOpenSnackBar={setOpenSnackBar}></UpdateModal>
        <DeleteModal onpenDelete={onpenDelete} setOpenDelete={setOpenDelete} departmentSelected={departmentSelected}  updated={updated} setUpdated={setUpdated} handleClosePopover={handleClose} setOpenSnackBar={setOpenSnackBar}></DeleteModal>
    </div>
  )
}

export default DepartmentList
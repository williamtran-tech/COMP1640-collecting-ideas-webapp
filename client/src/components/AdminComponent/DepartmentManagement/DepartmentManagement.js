import React from 'react'
import { Paper,Button, Typography, Modal, TextField, Box, Snackbar, Slide} from '@material-ui/core'
import { Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Grid } from '@mui/material';
import { useState } from 'react';
import handleApi from '../../../service/handleApi';
import DepartmentList from './DepartmentList';
import DepartmentDetail from './DepartmentDetail';
const DepartmentManagement = () => {
    const [departmentName, setDepartmentname] = useState('');
    const[isOpen, setIsOpen]= useState(false)
    const[updated, setUpdated]=useState(false)
    const [id, setId]= useState(1)
    const [openSnackBar, setOpenSnackBar]= useState({
        status: false,
        message:""
      })
      const handleCloseSnackBar = () => {
        setOpenSnackBar({
          status: false,
          message:""
        })
      };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data={
        name: departmentName
    }
    handleApi.admin_post_department(data).then(response=>{
        console.log(response.data)
        setUpdated(!updated)
        setOpenSnackBar({
            status:true,
            message: "Create department successfully",
            color:"success"
          })
    }).catch(error=>{
        console.error(error);
        setOpenSnackBar({
            status:true,
            message: error.response.data.msg,
            color:"error"
          })
    })
    hanldeClose()
    setDepartmentname('');
  };
  const hanldeClose =()=>{
    setIsOpen(false)
  }
  const hanldeOpen =()=>{
    setIsOpen(true)
  }
  const handleInputChange = (e) => {
    setDepartmentname(e.target.value);
  };

  return (
    <div>
        <Grid container>
            <Grid item xs={12}>
                <Paper className='header_admin'>
                <Typography> Department Management</Typography>
                    <Button variant="contained" startIcon={<AddIcon/>} className='create_user_btn' onClick={hanldeOpen}>
                    New Department
                </Button>
                </Paper>
            </Grid>
            <Grid item xs={3} className='department_list_container'>
                <DepartmentList updated={updated} setUpdated={setUpdated} setId={setId} setOpenSnackBar={setOpenSnackBar}></DepartmentList>
            </Grid>
            <Grid item xs={9}className='department_user_container' >
                <DepartmentDetail id={id}></DepartmentDetail>
            </Grid>
        </Grid>
        <Modal open={isOpen} onClose={hanldeClose} aria-labelledby="modal-title"
                aria-describedby="modal-description" 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box className='createNewCategory'>
                <h2>Create New Department</h2>
                <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={departmentName}
                    onChange={handleInputChange}
                    fullWidth
                />
                <Button type="submit" variant="contained" className='create_user_btn'>
                    Create
                </Button>
                </form>
            </Box>
        </Modal>
        <Snackbar
         open={openSnackBar.status}
         onClose={handleCloseSnackBar}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         autoHideDuration={2000}
         TransitionComponent={Slide}
         TransitionProps={{ direction: 'left' }}
         >
            <Alert onClose={handleCloseSnackBar} severity={openSnackBar.color} sx={{ width: '100%' }}>
                {openSnackBar.message}
            </Alert>
        </Snackbar>
    </div>
  )
}
export default DepartmentManagement
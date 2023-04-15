import React from 'react'
import { Paper,Button, Typography, Modal, TextField, Box, Snackbar, Slide} from '@material-ui/core'
import { Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Grid } from '@mui/material';
import CategoryList from './CategoryList';
import { useState } from 'react';
import handleApi from '../../../service/handleApi';
import '../../../style/department.css'
const CategoryManagement = () => {
    const [categoryName, setCategoryname] = useState('');
    const[isOpen, setIsOpen]= useState(false)
    const[updated, setUpdated]=useState(false)
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
        name: categoryName
    }
    handleApi.admin_post_category(data).then(response=>{
        console.log(response.data)
        setUpdated(!updated)
        setOpenSnackBar({
            status:true,
            message: "Create new category successfully",
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
    setCategoryname('');
  };
  const hanldeClose =()=>{
    setIsOpen(false)
  }
  const hanldeOpen =()=>{
    setIsOpen(true)
  }
  const handleInputChange = (e) => {
    setCategoryname(e.target.value);
  };

  return (
    <div>
        <Grid container>
            <Grid item xs={12}>
                <Paper className='header_admin'>
                <Typography> Category Management</Typography>
                    <Button variant="contained" startIcon={<AddIcon/>} className='create_user_btn' onClick={hanldeOpen}>
                    New Category
                </Button>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <CategoryList updated={updated} setUpdated={setUpdated} setOpenSnackBar={setOpenSnackBar}> </CategoryList>
            </Grid>
        </Grid>

        <Modal open={isOpen} onClose={hanldeClose} aria-labelledby="modal-title"
                aria-describedby="modal-description" 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box className='createNewCategory'>
                <h2>Create New Category</h2>
                <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={categoryName}
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

export default CategoryManagement
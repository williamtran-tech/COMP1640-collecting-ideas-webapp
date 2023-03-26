import React from 'react'
import { Paper,Button, Typography, Modal, TextField, Box} from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add';
import { Grid } from '@mui/material';
import CategoryList from './CategoryList';
import { useState } from 'react';
import handleApi from '../../../service/handleApi';
const CategoryManagement = () => {
    const [categoryName, setCategoryname] = useState('');
    const[isOpen, setIsOpen]= useState(false)
    const[updated, setUpdated]=useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    const data={
        name: categoryName
    }
    handleApi.admin_post_category(data).then(response=>{
        console.log(response.data)
        setUpdated(!updated)
    }).catch(error=>{
        console.error(error);
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
                <Typography> Topic Management</Typography>
                    <Button variant="contained" startIcon={<AddIcon/>} className='create_user_btn' onClick={hanldeOpen}>
                    New Category
                </Button>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <CategoryList updated={updated} setUpdated={setUpdated}> </CategoryList>
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
    </div>
  )
}

export default CategoryManagement
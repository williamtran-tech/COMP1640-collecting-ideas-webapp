import React, { useEffect } from 'react'
import { useState } from 'react';
import { Modal, Box, Button, TextField } from '@material-ui/core';
import handleApi from '../../../service/handleApi';
const UpdateModal = ({onpenUpdate,setOpenUpdate, categorySelected,updated, setUpdated}) => {
    console.log(categorySelected)
    const[categoryName, setCategoryname]= useState(categorySelected.name)
    useEffect(()=>{
        setCategoryname(categorySelected.name)
    },[categorySelected])
  const handleSubmit = (e) => {
    e.preventDefault();
    const data={
        name: categoryName
    }
    handleApi.admin_update_category(categorySelected.id, data).then(response=>{
        console.log(response.data)
        setUpdated(!updated)
    }).catch(error=>{
        console.error(error);
    })
    hanldeClose()
    // setCategoryname('');
  };
  const hanldeClose =()=>{
    setOpenUpdate(false)
  }

  const handleInputChange = (e) => {
    setCategoryname(e.target.value);
  };
  return (
    <div>
        <Modal open={onpenUpdate} onClose={hanldeClose} aria-labelledby="modal-title"
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

export default UpdateModal
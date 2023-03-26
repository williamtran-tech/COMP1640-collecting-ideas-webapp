import React, { useEffect } from 'react'
import { useState } from 'react';
import { Modal, Box, Button, TextField } from '@material-ui/core';
import handleApi from '../../../service/handleApi';
const DeleteModal = ({onpenDelete,setOpenDelete, categorySelected,updated, setUpdated}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleApi.admin_delete_category(categorySelected.id).then(response=>{
        console.log(response.data)
        setUpdated(!updated)
    }).catch(error=>{
        console.error(error);
    })
    hanldeClose()
  };
  const hanldeClose =()=>{
    setOpenDelete(false)
  }
  return (
    <div>
        <Modal open={onpenDelete} onClose={hanldeClose} aria-labelledby="modal-title"
    aria-describedby="modal-description" 
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box className='createNewCategory'>
            <h2>Are you want to delete this category {categorySelected.name}</h2>
            <Button onClick={handleSubmit} variant="contained" className='create_user_btn'>
                Delete
            </Button>
        </Box>
        </Modal>
    </div>
  )
}

export default DeleteModal
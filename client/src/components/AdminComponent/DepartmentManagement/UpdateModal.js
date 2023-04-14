import React, { useEffect } from 'react'
import { useState } from 'react';
import { Modal, Box, Button, TextField } from '@material-ui/core';
import handleApi from '../../../service/handleApi';
const UpdateModal = ({onpenUpdate,setOpenUpdate, departmentSelected,updated, setUpdated, setOpenSnackBar}) => {
    const[deparmentName, setDepartmentname]= useState(departmentSelected.name)
    useEffect(()=>{
        setDepartmentname(departmentSelected.name)
    },[departmentSelected])
  const handleSubmit = (e) => {
    e.preventDefault();
    const data={
        name: deparmentName
    }
    handleApi.admin_update_department(departmentSelected.id, data).then(response=>{
        console.log(response.data)
        setUpdated(!updated)
        setOpenSnackBar({
          status:true,
          message: "Update department successfully",
          color:"success"
        })
    }).catch(error=>{
      console.log(error)
      setOpenSnackBar({
        status:true,
        message: error.response.data,
        color:"error"
      })
    })
    hanldeClose()
    // setDepartmentname('');
  };
  const hanldeClose =()=>{
    setOpenUpdate(false)
  }

  const handleInputChange = (e) => {
    setDepartmentname(e.target.value);
  };
  return (
    <div>
        <Modal open={onpenUpdate} onClose={hanldeClose} aria-labelledby="modal-title"
    aria-describedby="modal-description" 
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box className='createNewCategory'>
            <h2>Update {departmentSelected.name}</h2>
            <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                variant="outlined"
                value={deparmentName}
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
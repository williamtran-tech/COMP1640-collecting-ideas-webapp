import React from 'react'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import handleApi from '../../../service/handleApi';
const DeleteIdeaModal = ({id, openDeleteModal, setOpenDeleteModal, setUpdated, updated}) => {
    const handleClose = () => {
        setOpenDeleteModal(false);
      };
    console.log(id);
    const handleDelete =()=>{
        handleApi.admin_force_delete_ideas(id).then(response=>{
            console.log(response.data)
            setOpenDeleteModal(false);
            setUpdated(!updated)
            
        })
    }
  return (
    <Modal
      open={openDeleteModal}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="modal-title" variant="h6" component="h2">
          Are you sure you want to delete this idea?
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" onClick={handleClose} sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default DeleteIdeaModal
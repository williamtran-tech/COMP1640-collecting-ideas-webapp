import React from 'react'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const UploadProfilePic = ({openModal,setOpenModal}) => {

    const handleClose = () => {
        setOpenModal(false);
      };
  return (
    <div>
            <Modal
            open={openModal}
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
                Are you sure you want to delete this item?
            </Typography>
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" >
                Delete
                </Button>
                <Button variant="contained" onClick={handleClose} sx={{ ml: 2 }}>
                Cancel
                </Button>
            </Box>
            </Box>
        </Modal>
  </div>
  )
}

export default UploadProfilePic
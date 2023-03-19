import React from 'react'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Avatar } from '@material-ui/core';
import { useState, useRef } from 'react';
const UploadProfilePic = ({openModal,setOpenModal}) => {
    const filePicekerRef = useRef(null)
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
   
   
    const handleChooseClick = () => {
        filePicekerRef.current.click();
    };
    const handleFileChange = (event) => {
        event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0];
    
        reader.onloadend = () => {
            setSelectedFile(file);
            setImagePreview(reader.result); 
        };
    
        reader.readAsDataURL(file);
    }; 
    const handleClose = () => {
        setOpenModal(false);
        setImagePreview(null);
      };
    // console.log(imagePreview)
    //         console.log(filePicekerRef)
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            }}>
                <Avatar                                     
                        src={imagePreview}
                        style={{ width: 150, height: 150 }}/>
                <div style={{ marginTop: 10, display:'flex', gap: 10}}>
                    <Button variant="contained" onClick={handleChooseClick}>
                        Upload
                        <input
                        ref={filePicekerRef}
                        accept="image/*, video/*"
                        onChange={handleFileChange}
                        type="file"
                        hidden
                    />
                    </Button>
                    <Button variant="contained" onClick={handleClose}>
                    Cancel
                    </Button>
                </div>
                
           
            </Box>
        </Modal>
  </div>
  )
}

export default UploadProfilePic
import React from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useRef, useEffect } from 'react';
import { MenuItem, Stack, Tabs, Tab } from '@mui/material';
import handleApi from '../../../service/handleApi';
import { Typography, Chip } from '@material-ui/core';
import FolderIcon from '@mui/icons-material/Folder';
import FileSaver from 'file-saver';
const CreateUserForm = ({openModal, setOpenModal, department, role, setSubmited, submited,setOpenSnackBar }) => {
    const [tabValue, setTabValue] = useState(0);
    const filePicekerRef = useRef(null)
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const initialFormState = {
        fullName: '',
        email: '',
        departmentId: '',
        roleId: ''
      };
      const [user, setUser] = useState(initialFormState);
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };
     
      const handleClose = () => {
        setOpenModal(false);
        setUser(initialFormState);
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        handleApi.admin_create_user(user).then(
            response =>{
                console.log(response.data)
                setSubmited(!submited)
                setOpenSnackBar({
                  status: true,
                  message:"Create user successfully",
                  color:"success"
                })
            }
        ).catch(e => {
          console.log(e);
          setOpenSnackBar({
            status:true,
            message: e.response.data.message,
            color:"error"
          })
        });
        setOpenModal(false);
        setUser(initialFormState);
      };
      const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
      };
      const handleFileChange = (event) => {
        event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0];
    
        reader.onloadend = () => {
            setSelectedFile(file);
            setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      };
      const  clear_file= ()=>{
        setFilePreview(null);
     }

     const donwloadTemplate = ()=>{
      handleApi.QA_dowload_template().then(response=>{
        const blob = new Blob([response.data], { type: 'text/csv' });
        FileSaver.saveAs(blob, `Template insert bulk of user.csv`)
        console.log(response);
      }).catch(error=>{
        console.error("Failed to download topic CSV file.", error);
      })
  }
  const upload_bulk_users=()=>{
    const formData = new FormData();
    formData.append("file", selectedFile);
    handleApi.QA_upload_bulk_user(formData).then(response=>{
      console.log(response.data)
      setSubmited(!submited)
      setOpenModal(false);
    })
  }
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ 
          position: 'absolute',
          bgcolor: 'white',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,}}>
            <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="none" centered> 
                <Tab label="Single account" />
                <Tab label="Multiple account" />
            </Tabs>
            {tabValue===0&&(<><div className='titleform'>
              <Typography variant="h5" fontWeight="light">
                Create new user
              </Typography>
            </div>
            <form onSubmit={handleSubmit} className='form_create_user'>
                  <TextField
                    label="Full Name"
                    type="text"
                    pattern="[A-Za-z ]+"
                    title="Please enter alphabetic characters and spaces only"
                    name="fullName"
                    value={user.fullName}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                  
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    inputmode="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Please enter a valid email address"
                    value={user.email}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                  <Stack direction={'row'}>
                  <TextField
                    label="Department"
                    variant="outlined"
                    select
                    name="departmentId"
                    value={user.departmentId}
                    onChange={handleInputChange}
                    required
                    fullWidth
                  >
                    {department &&
                      department.map((department) => (
                        <MenuItem key={department.id} value={department.id}>
                          {department.name}
                        </MenuItem>
                      ))}
                  </TextField>
                  <TextField
                    label="Role"
                    variant="outlined"
                    select
                    name="roleId"
                    value={user.roleId}
                    onChange={handleInputChange}
                    required
                    fullWidth
                  >
                    {role &&
                      role.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                          {role.name}
                        </MenuItem>
                      ))}
                  </TextField>
                  </Stack>
                <div className='action_user_form'>
                  <Button type="submit" variant="contained">
                    Create User
                  </Button>
                  <Button onClick={handleClose} variant="contained" className='cancle_btn' >
                    Cancel
                  </Button>
                </div>
                  
            </form></>)}
            {
              tabValue===1&&(
                <>
                <div className='titleform'>
                  <Typography variant="h5" fontWeight="light">
                    Import list of account
                  </Typography>
                </div>
                <div className='titleform'>
                  <Button onClick={donwloadTemplate}> Download template</Button>
                </div>
                <form className='form_create_user'>
                <div>
                                    {/* <IconButton onClick={() => filePicekerRef.current.click()}>
                                          <DriveFolderUploadIcon color="primary"  />
                                    </IconButton> */}
                                    <Button className="btn" onClick={() => filePicekerRef.current.click()}>
                                          Upload
                                      </Button>
                                    <input
                                          ref={filePicekerRef}
                                          accept=".csv, .txt, .pdf"
                                          onChange={handleFileChange}
                                          type="file"
                                          hidden
                                      />
                                      {(filePreview) && (
                                        <>
                                        <button className="btn" onClick={clear_file}>
                                              x
                                          </button>
                                          <Button onClick={upload_bulk_users}>Create</Button>
                                        </>
                                        
                                      )}
                                  </div>
                                  <div className="preview">
                                  {filePreview != null && (
                                          <Chip icon={<FolderIcon/>} label={selectedFile.name} size="small" color="primary" className='chip' sx={{backgroundColor: "#6D9886", marginTop: 1}}/>
                                  )}
                                  </div>
                </form>
                </>
                
              )
            }
        </Box>
      </Modal>
  </>
  )
}

export default CreateUserForm
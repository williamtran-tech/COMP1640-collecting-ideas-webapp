import { Box, Grid, Avatar, Typography, Tabs, Tab, Button, Badge, IconButton, Modal, Snackbar, Slide } from '@material-ui/core'
import { Stack, Alert } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import React from 'react'
import '../style/userprofile.css'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import jwt_decode from 'jwt-decode';
import handleApi from '../service/handleApi'
import ReactHistory from './ReactHistory'
import ViewsHistory from './ViewsHistory'
import Contribution from './Contribution'
import UploadProfilePic from './UploadProfilePic'

const UserProfile = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [openModal, setOpenModal] = useState(false)
  const [openModalForgot, setOpenModalForgot] = useState(false)
  const [profile, setProfile] = useState([])
  const [uploaded, setUploaded] = useState(false)
  const [openSnackBar, setOpenSnackBar]= useState(false)
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  console.log(decodedToken)
  useEffect(()=>{
       handleApi.get_user_inf(id).then(response=>{
      console.log(response.data)
      setProfile(response.data)
    })
  }, [uploaded])
  const handleOpen = () =>{
    setOpenModal(true)
  }
  const handleOpenForgot = () =>{
    setOpenModalForgot(true)
  }
  const changePassword=(email)=>{
    handleApi.forgotPassword({email:email}).then(response=>{
      console.log(response.data)
      setOpenModalForgot(false);
      setOpenSnackBar(true)
    })
  }
  const handleCloseForgot = () => {
    setOpenModalForgot(false);
  };
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false)
  }
  return (
    <div> 
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Stack className="avatar_profile">
            { profile && profile.info &&(
              <>
              <div className='background_profile'>
                <div className="avatar_profile">
                <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <IconButton onClick={handleOpen}>
                    <CameraAltIcon></CameraAltIcon>
                  </IconButton>
                }>
                <Avatar                                     
                        src={`http://localhost:5050/${profile.info.profileImage}`}
                        style={{ width: 150, height: 150 }}
                        />
                </Badge>
                </div>
              </div>
               
              <div className='user_information'>
                <Typography variant="h5" sx={{ textAlign: 'center' }}> {profile.info.fullName} </Typography>
                <Stack direction={'row'} spacing={1}>
                    <Typography >{profile.info.email}  • </Typography>
                <Typography className={profile.info  ? 'active' : 'inactive'}> {profile.info ? 'Active' : 'Inactive'}
                </Typography> 
               </Stack>
                <div>

                    <Button variant="contained" size="small" style={{backgroundColor:'#6D9886'}} onClick={handleOpenForgot}>
                      Change Password
                    </Button>
                    <Typography variant="body1" gutterBottom>
                      Department: {profile.info.Department.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Role: {profile.info.Role.name}
                    </Typography>
                </div>
              </div>
              </>     
            )}
           </Stack>
        </Grid>
        <Grid item xs={12} className='user_table'>
          <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="none" centered> 
              <Tab label="Contributions" />
              <Tab label="View History" />
              <Tab label="Reaction History" />
          </Tabs>
      {tabValue === 0 && profile&& profile.contributions &&(
       <Contribution contribution ={profile.contributions}></Contribution>
      )}
      {tabValue === 1 && (
          <ViewsHistory view={profile.viewHistory}></ViewsHistory>
      )}
      {tabValue === 2 && (
        <ReactHistory react={profile.reactHistory}></ReactHistory>
      )}
        </Grid>
        </Grid>
        {/* {
        profile&& profile.info && (<UploadProfilePic openModal={openModal} setOpenModal={setOpenModal} id={decodedToken.userId} uploaded={uploaded} setUploaded={setUploaded} avatar={profile.info.profileImage}></UploadProfilePic>)
        } */}
        <Modal
            open={openModalForgot}
            onClose={handleCloseForgot}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
            <Box className='reset_password' >
                <Stack spacing={2}>
                  <Typography>If you want to reset password, we will send you an email with a link to confirm new password</Typography>
                  <Stack direction={"row"} spacing={1}>
                      <Button style={{backgroundColor:'#6D9886'}} onClick={()=>{changePassword(profile && profile.info &&profile.info.email)}}>Ok</Button>
                      <Button onClick={handleCloseForgot}>Cancel</Button>
                  </Stack>
                </Stack>
            </Box>
        </Modal>
        <Snackbar
         open={openSnackBar}
         onClose={handleCloseSnackBar}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         autoHideDuration={2000}
         TransitionComponent={Slide}
         TransitionProps={{ direction: 'left' }}
         >
            <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
                Email sent
            </Alert>
        </Snackbar>
      </Box>
    </div>
  )
}

export default UserProfile
import { Box, Grid, Avatar, Typography, Tabs, Tab, Button, Badge, IconButton } from '@material-ui/core'
import { Stack } from '@mui/material'
import { useEffect, useState } from 'react'
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
  const [tabValue, setTabValue] = useState(0);
  const [openModal, setOpenModal] = useState(false)
  const [profile, setProfile] = useState([])
  const [uploaded, setUploaded] = useState(false)
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  console.log(decodedToken)
  useEffect(()=>{
    if(decodedToken){
       handleApi.get_user_inf(decodedToken.userId).then(response=>{
      console.log(response.data)
      setProfile(response.data)
    })
    }
  }, [uploaded])
  const handleOpen = () =>{
    setOpenModal(true)
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
                        src={profile.info.profileImage}
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
                    <Stack direction={'row'} spacing={1}> 
                    <Typography variant="subtitle1" gutterBottom>
                      
                    </Typography>
                    <Button variant="contained" size="small">
                      Change Password
                    </Button>
                    </Stack>
                    
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
        {
        profile&& profile.info && (<UploadProfilePic openModal={openModal} setOpenModal={setOpenModal} id={decodedToken.userId} uploaded={uploaded} setUploaded={setUploaded} avatar={profile.info.profileImage}></UploadProfilePic>)
        }
      </Box>
    </div>
  )
}

export default UserProfile
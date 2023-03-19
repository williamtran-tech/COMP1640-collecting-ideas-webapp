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
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);

  useEffect(()=>{
    if(decodedToken){
       handleApi.get_user_inf(decodedToken.userId).then(response=>{
      console.log(response.data)
      setProfile(response.data)
    })
    }
   
  }, [])
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
                <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <IconButton onClick={handleOpen}>
                    <CameraAltIcon></CameraAltIcon>
                  </IconButton>
                }>
                <Avatar                                     
                        src="https://b.fssta.com/uploads/application/soccer/headshots/885.vresize.350.350.medium.14.png"
                        style={{ width: 150, height: 150 }}/>
                </Badge>
                
                <Typography variant="h5"> {profile.info.fullName} </Typography>
                <Stack direction={'row'} spacing={1}>
                    <Typography >{profile.info.email}  • </Typography>
                <Typography className={profile.info  ? 'active' : 'inactive'}> {profile.info ? 'Active' : 'Inactive'}
                </Typography> 
               </Stack>
                <div>
                    <Stack direction={'row'} spacing={1}> 
                    <Typography variant="subtitle1" gutterBottom>
                      
                    </Typography>
                    <Button variant="contained" size="small" sx={{ mr: 2 }}>
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
              </>     
            )}
           </Stack>
        </Grid>
        <Grid item xs={12}>
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
        <UploadProfilePic openModal={openModal} setOpenModal={setOpenModal}></UploadProfilePic>
      </Box>
    </div>
  )
}

export default UserProfile
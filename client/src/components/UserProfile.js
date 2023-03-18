import { Box, Grid, Avatar, Typography, Tabs, Tab } from '@material-ui/core'
import { Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import React from 'react'
import '../style/userprofile.css'
import jwt_decode from 'jwt-decode';
import handleApi from '../service/handleApi'
import ReactHistory from './ReactHistory'

const UserProfile = () => {
  const [tabValue, setTabValue] = useState(0);
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
  return (
    <div> 
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Stack className="avatar_profile">
            <Avatar                                     
            src="https://b.fssta.com/uploads/application/soccer/headshots/885.vresize.350.350.medium.14.png"
            style={{ width: 150, height: 150 }}/>
                <Typography>jajsjsj </Typography>
                <Stack direction={'row'} spacing={1}>
                    <Typography>kewkwkw • 
                </Typography>
                <Typography>
                {/* //  className={userInf.isVerified  ? 'active' : 'inactive'}
                //         {userInf.isVerified ? 'Active' : 'Inactive'} */}
                </Typography> 
                </Stack>
        </Stack>
        </Grid>
        <Grid item xs={12}>
          <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="none" centered> 
              <Tab label="Information" />
              <Tab label="View History" />
              <Tab label="Contributions" />
              <Tab label="Reaction History" />
          </Tabs>
          {tabValue === 0 && (
        <div>
         helo
        </div>
      )}
      {tabValue === 1 && (
        <div>
          helo helo
        </div>
      )}
      {tabValue === 2 && (
        <div>
           helo helo helo
        </div>
      )}
      {tabValue === 3 && (
        <ReactHistory react={profile.reactHistory}></ReactHistory>
      )}
        </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default UserProfile
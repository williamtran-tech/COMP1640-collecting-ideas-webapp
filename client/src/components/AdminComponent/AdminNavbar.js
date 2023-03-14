import {Grid,Box, Divider, Typography, IconButton } from "@material-ui/core";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import '../../style/admin.css'
const AdminNavbar = () => {
  const [value, setValue] = useState(1);
const navigate = useNavigate();
  
  const logout= () => {
    navigate("/login")
    localStorage.clear()
}
const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
   <Box className="dashboard_navigation">
       <Grid className='admin-logo' xs={12}>
            <img className ='logo' src={logo} alt="" />
        </Grid>
        <Divider></Divider>
        <Grid className='admin-navigation' >
           <div>
             {/* <Typography variant="body2" className="Admin_function_name">Topic Management</Typography> */}
             <Tabs orientation="vertical" 
             value={value}
             onChange={handleChange}
            >

              <TabList >
                <Typography variant="body2" className="Admin_function_name">Topic Management</Typography>
                <Tab variant={value === 1 ? 'solid' : 'plain'} color={value === 1 ? 'primary' : 'neutral'} iconPosition="start"className="tab" component={Link} to="/"> <ListItemDecorator><VisibilityIcon /></ListItemDecorator>  View all topic</Tab>
                <Tab variant={value === 2 ? 'solid' : 'plain'} color={value === 2 ? 'primary' : 'neutral'} className="tab" component={Link} to="/create"><ListItemDecorator><AddCircleIcon /></ListItemDecorator>Create new topic</Tab>
                <Typography variant="body2" className="Admin_function_name">Category Management</Typography>
                <Tab variant={value === 4 ? 'solid' : 'plain'} color={value === 4 ? 'primary' : 'neutral'} className="tab" component={Link} to="/">View all topic</Tab>
                <Tab variant={value === 5 ? 'solid' : 'plain'} color={value === 5 ? 'primary' : 'neutral'} className="tab" component={Link} to="/create">Create new topic</Tab>
                <Typography variant="body2" className="Admin_function_name">User Management</Typography>
                <Tab variant={value === 7 ? 'solid' : 'plain'} color={value === 7 ? 'primary' : 'neutral'} className="tab" component={Link} to="/">View all topic</Tab>
                <Tab variant={value === 8 ? 'solid' : 'plain'} color={value === 8 ? 'primary' : 'neutral'} className="tab" component={Link} to="/create">Create new topic</Tab>
               </TabList>
             </Tabs>
           </div>
           <Divider></Divider>
        </Grid>
        <Grid className='admin-logo' xs={12}>
          <IconButton onClick={logout}>
              {/* <Badge badgeContent={4} color="error">
                  <MailIcon className='icon'/>
              </Badge> */}
              <LogoutIcon className='icon'></LogoutIcon>
          </IconButton>
        </Grid>
    </Box>
  )
}

export default AdminNavbar
import {Grid,Box, Divider, Typography, IconButton } from "@material-ui/core";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'
import { useState } from "react";
import TopicIcon from '@mui/icons-material/Topic';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import ClassIcon from '@mui/icons-material/Class';
import BarChartIcon from '@mui/icons-material/BarChart';
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
            <div>
                <img className ='logo_admin' src={logo} alt="" /> 
            </div>
            <div>
          
             <Tabs orientation="vertical" 
             value={value}
             onChange={handleChange}
            >
              <TabList >
                <Tab variant={value === 0 ? 'solid' : 'plain'} color={value === 0 ? 'primary' : 'neutral'} iconPosition="start" className="tab" component={Link} to="/"> <ListItemDecorator><TopicIcon /></ListItemDecorator>Topic Management</Tab>
                <Tab variant={value === 1 ? 'solid' : 'plain'} color={value === 1 ? 'primary' : 'neutral'}  iconPosition="start" className="tab" component={Link} to="/users"><ListItemDecorator><AccountBoxIcon /></ListItemDecorator>User Management</Tab>
                <Tab variant={value === 2 ? 'solid' : 'plain'} color={value === 2 ? 'primary' : 'neutral'} className="tab" component={Link} to="/"><ListItemDecorator><CategoryIcon /></ListItemDecorator>Category Management</Tab>
                <Tab variant={value === 3 ? 'solid' : 'plain'} color={value === 3 ? 'primary' : 'neutral'} className="tab" component={Link} to="/"><ListItemDecorator><ClassIcon /></ListItemDecorator>Department Management</Tab>
                <Tab variant={value === 4 ? 'solid' : 'plain'} color={value === 4 ? 'primary' : 'neutral'} className="tab" component={Link} to="/statistic"><ListItemDecorator><BarChartIcon /></ListItemDecorator>Statistic</Tab>
               </TabList>
             </Tabs>
           </div>
      </Grid>
        <Divider></Divider>
      <Grid className='admin_logout' xs={12} >
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
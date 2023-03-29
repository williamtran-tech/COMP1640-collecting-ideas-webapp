import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import { Box, CardHeader,Badge,IconButton, Chip, Typography } from '@mui/material'
import { Card,CardActions, Divider} from '@mui/material'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

import { Grid } from '@mui/material'
import '../style/listitem.css'
import Moment from "moment"
import handleApi from '../service/handleApi'
import { Link } from 'react-router-dom';
const ListTopics = ({isLoggedIn}) => {
    const [listtopics, setlisttopics] = useState([]);
    const [getTopic, setGetTopic]=useState(true)
    useEffect(() =>{
      const retrievelisttopics = () => {
      handleApi.getListTopic()
        .then(response => {
          setlisttopics(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
      retrievelisttopics()
      // eslint-disable-next-line 
    },[])
    
  return (
    <Box>
        <Grid container  className='header' >
                <Grid item xs={12}  className='header-item'>
                            <Typography variant='h3' fontWeight="fontWeightBold" color="#F0E9D2" >
                                All topics
                            </Typography>
                </Grid>
            </Grid>
        <Grid container className='list-item'>
            {
                listtopics.topics?.map((topic) =>
                {console.log('closureDate:', Date(topic.closureDate));
                console.log('finalClosureDate:', Date(topic.finalClosureDate));
                console.log('now:', Date());
                return(
                <Grid item xs={12} md={4} className={"topic-item"}>
                    <Link to = {`/topics/${topic.id}`} style={{ textDecoration: 'none'}}>
                    <Card className={
                       new Date(topic.finalClosureDate) < new Date() ? "topic_status_3":
                       new Date(topic.closureDate) < new Date() ? "topic_status_2"
                      :
                      "topic_status_1"
                    }>
                    <CardHeader title={topic.name}  action={
                        <IconButton>
                            <Badge badgeContent={topic.idea_quantity} sx={{"& .MuiBadge-badge": {color: "#fefae0",backgroundColor: "#181D31"}}}>
                                <EmojiObjectsIcon style={{ color: '#fefae0'}}/>
                            </Badge>
                        </IconButton>
                    }>
                    </CardHeader>
                    <Divider />
                    <CardActions>
                        <Grid xs={12} className="date">
                        <Chip icon={<AccessTimeIcon/>} label={Moment(topic.closureDate).format('YYYY/MM/DD')} sx={{backgroundColor: "#fefae0"}} />
                        <Chip icon={<AccessTimeFilledIcon/>} label={Moment(topic.finalClosureDate).format('YYYY/MM/DD')} sx={{backgroundColor: "#fefae0"}} />
                        </Grid>
                    </CardActions>
                </Card>
              </Link>
                
            </Grid> 
                )})
            }
        </Grid>
      
    </Box>
  )
}

export default ListTopics
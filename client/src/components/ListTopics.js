import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import { Box, CardHeader,Badge,IconButton, List, ListItem } from '@mui/material'
import { Card, Typography, Button, CardActions, Divider} from '@mui/material'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

import { Grid } from '@mui/material'
import '../style/listitem.css'
import Moment from "moment"
import handleApi from '../service/handleApi'
const ListTopics = () => {
    const [listtopics, setlisttopics] = useState([]);
    useEffect(() =>{
      retrievelisttopics()
    },[])
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
  return (
    <Box>
        <Grid container className='list-item'>
            {
                listtopics.topics?.map((topic) =>(
                    <Grid item xs={12} md={4} >
                <Card>
                    <CardHeader title={topic.topic} action={
                        <IconButton>
                            <Badge badgeContent={topic.idea_quantity} color="primary">
                                <EmojiObjectsIcon color="action"/>
                            </Badge>
                        </IconButton>
                    }>
                    </CardHeader>
                    <Divider />
                    <CardActions>
                        <div>
                            <div  className='time'>
                                <AccessTimeIcon></AccessTimeIcon>
                                <div>Closure date:  </div>
                                <div>  {Moment(topic.closure_date).format('YYYY/MM/DD')}</div>
                            </div>
                            <div className='time'>
                                <AccessTimeFilledIcon></AccessTimeFilledIcon>
                                <div>Final date:</div>
                                <div>{Moment(topic.final_closure_date).format('YYYY/MM/DD')}</div>
                            </div>
                        </div>
                        
                    </CardActions>
                </Card>
            </Grid> 
                ))
            }

            {/* <Grid item xs={12} md={4} lg={3}>
                <Card>
                    <CardHeader title="Topic 1" action={
                        <IconButton>
                            <Badge badgeContent={4} color="primary">
                                <EmojiObjectsIcon color="action"/>
                            </Badge>
                        </IconButton>
                    }>
                    </CardHeader>
                    <Divider />
                    <CardActions>
                        <div>
                            <div  className='time'>
                                <AccessTimeIcon></AccessTimeIcon>
                                <div>Closure date:</div>
                                <div>12333</div>
                            </div>
                            <div className='time'>
                                <AccessTimeFilledIcon></AccessTimeFilledIcon>
                                <div>Final date:</div>
                                <div>1234</div>
                            </div>
                        </div>
                        
                    </CardActions>
                </Card>
            </Grid> */}
        </Grid>
      
    </Box>
  )
}

export default ListTopics
import { Box, Grid, Avatar, IconButton,Tooltip,Typography, Card, CardActions, CardContent, Badge } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import handleApi from '../service/handleApi'
import { Link } from 'react-router-dom';
import '../style/listitem.css'


const ListIdeas = () => {
    const { id } = useParams();

    const [listideas, setlistideas] = useState([]);

    useEffect(() =>{
      retrievelistideas()
      // eslint-disable-next-line 
    },[])

    const retrievelistideas = () => {
      handleApi.getIdeas_by_topic(id)
        .then(response => {
          setlistideas(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
  return (
        <Box>
            <Grid container className='listidea'> 
            {
                listideas.ideas?.map(idea =>(
                    <Grid item xs={11} md={9} padding={3} className='idea' key={idea.id}>
                    <Link id="RouterNavLink" to={"/ideas/" + idea.id} style={{ textDecoration: 'none'}}>
                    <Grid container justifyContent='center'>
                        <Grid item xs={1} className='avatar'>
                            <IconButton>
                                <Tooltip title="VO HOANG TAM" arrow>
                                    <Avatar alt="Cindy Baker" src="" sx={{ width: 30, height: 30 }}/>
                                </Tooltip>
                            </IconButton>
                        </Grid>
                        <Grid item xs={8}>
                            <Card className='card'>
                            <CardContent>
                                <Typography variant="body2" >
                                {idea.idea}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing >
                                <Link to ="/ok"id='ok'>Category:{idea.category}</Link>
                            </CardActions>  
                            </Card>
                        </Grid>
                        <Grid item xs={1} className='react-container'>
                            <div className='react'>
                                <div>
                                    <Badge badgeContent={5} color="primary" sx={{ '& .MuiBadge-badge': {right: -6, fontSize: 9}}}  anchorOrigin={{vertical: 'bottom', horizontal: 'right', }}>
                                        <ThumbUpIcon color="action" style={{ fontSize: "20px" }} />
                                    </Badge>
                                </div>
                                <div>
                                    <Badge badgeContent={4} color="primary" sx={{ '& .MuiBadge-badge': {right: -6,top: 10}}}>
                                         <RemoveRedEyeIcon color="action" style={{ fontSize: "20px" }}  />
                                    </Badge>
                                </div>
                                <div>
                                    <Badge badgeContent={4} color="primary" sx={{ '& .MuiBadge-badge': {right: -6, fontSize: 9}}} >
                                        <ThumbDownIcon color="action"  style={{ fontSize: "20px" }} />
                                    </Badge>
                                </div>
                            </div>

                        </Grid>
                    </Grid>
                    </Link>
                </Grid>
                ))
            }
                
                {/* <Grid item xs={11} md={9} padding={3} className='idea'>
                    <Grid container justifyContent='center'>
                        <Grid item xs={2} className='avatar'>
                            <IconButton>
                                <Tooltip title="VO HOANG TAM" arrow>
                                    <Avatar alt="Cindy Baker" src="" sx={{ width: 30, height: 30 }}/>
                                </Tooltip>
                            </IconButton>
                        </Grid>
                        <Grid item xs={8}>
                            
                            <Card className='card'>
                            <CardContent>
                                <Typography variant="body2" >
                                This impressive paella is a perfect party dish and a fun meal to cook
                                together with your guests. Add 1 cup of frozen peas along with the mussels,
                                if you like.
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing justifyContent='right'>
                                <Link>Category:</Link>
                            </CardActions>  
                            </Card>
                        </Grid>
                        <Grid item xs={2} className='react-container'>
                            <div className='react'>
                                <div>
                                    <Badge badgeContent={4} color="primary">
                                        <ThumbUpIcon color="action" />
                                    </Badge>
                                </div>
                                <div>
                                    <Badge badgeContent={4} color="primary">
                                         <RemoveRedEyeIcon color="action" />
                                    </Badge>
                                </div>
                                <div>
                                    <Badge badgeContent={4} color="primary">
                                        <ThumbDownIcon color="action" />
                                    </Badge>
                                </div>
                            </div>

                        </Grid>
                    </Grid>
                </Grid> */}
            </Grid>
        </Box>
  )
}

export default ListIdeas
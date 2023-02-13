import { Box, Grid, Avatar, IconButton,Tooltip,Typography, Card, CardActions, CardContent, Badge, Divider, CardHeader, FormControl, InputLabel, Select, MenuItem, Autocomplete, TextField, Paper,Stack, Chip, Button } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import handleApi from '../service/handleApi'
import { Link } from 'react-router-dom';
import Moment from "moment"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import CreateIcon from '@mui/icons-material/Create';
import '../style/listitem.css'
import ThumbDown from '@mui/icons-material/ThumbDown';
import { margin } from '@mui/system';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';


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

    const handleClick = () => {
        console.log('You clicked the Chip.');
      };
  return (
        <Box className="body-container">
             {listideas.info?.map(topic=>(
            <Grid container  className='header' key={topic.id}>
                <Grid item xs={12}  className='header-item'>
                            <Typography variant='h3' fontWeight="fontWeightBold" color="white" >
                                {topic.topic}
                            </Typography>
                </Grid>
                <Grid item xs={12}  className='header-item'>
                        <Chip icon={<EmojiObjectsIcon/>} label={topic.idea_quantity} size="small" color="primary" className='chip'/>
                        <Chip icon={<CreateIcon/>} label="Create more idea" size="small" color="primary" onClick={handleClick}/>
                </Grid>
                <Grid item xs={12} className='header-item'>
                            <div  className='time'>
                                <AccessTimeIcon></AccessTimeIcon>
                                <div>Closure date:  </div>
                                <Typography></Typography>
                                <div>  {Moment(topic.closure_date).format('YYYY/MM/DD')}</div>
                            </div> 
                            <div className='time'>
                                <AccessTimeFilledIcon></AccessTimeFilledIcon>
                                <div>Final date:</div>
                                <div>{Moment(topic.final_closure_date).format('YYYY/MM/DD')}</div>
                            </div>
                </Grid>
            </Grid>
             ))}
            <Grid container className='filter'>
                <Grid item xs={4} md={2} className="filter-item">
                    <FormControl fullWidth size="small">
                    <InputLabel id="sortby">Sort by</InputLabel>
                    <Select 
                        labelId="sortby"
                        id="sortby"
                        // value={age}
                        label="sortby"
                        // onChange={handleChange}
                    >
                        <MenuItem value={10} >Latest</MenuItem>
                        <MenuItem value={20}>Oldest</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                <Divider orientation="vertical" flexItem/>
                <Grid item xs={4} md={2} className="filter-item">
                    <FormControl fullWidth size="small">
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                        labelId="category"
                        id="category"
                        // value={age}
                        label="category"
                        // onChange={handleChange}
                    >
                        <MenuItem value={10} >cak</MenuItem>
                        <MenuItem value={20}>cak</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                <Divider orientation="vertical" flexItem/>
                <Grid item xs={8} md={4} className="filter-item">
                <Autocomplete size="small"
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={listideas.ideas?.map((option) => option.idea)}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search input"
                        InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        }}
                    />
                    )}/>
                </Grid>
            </Grid>
            <Grid container className='listidea'> 
                {listideas.ideas?.map(idea =>(
                    <Grid item xs={11} md={9} >
                    <Link to={"/ideas/"+idea.id}  style={{ textDecoration: 'none'}}>
                        <Paper elevation={1} className="idea" key={idea.id}>
                            <Grid container>
                                <Grid item className='header-idea' xs={12}>
                                    <Stack direction="row" spacing={2} className="avatar-category">
                                        <Tooltip title="VO HOANG TAM" arrow>
                                            <Avatar
                                            alt="T"
                                            src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/324659855_1288226605056706_1068574274762085817_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=cXa-aiUFgAIAX9zlbbV&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfBivjwSzqPY7MF9RJ8MIYtJ1DMRqctsGhSXkJgf8_rSUQ&oe=63EFBF1D"
                                            sx={{ width: 30, height: 30  }}
                                            />
                                        </Tooltip>

                                        <Stack direction="row" spacing={1}>
                                            <Chip label={idea.category} color="primary" size="small" onClick={handleClick}/>
                                        </Stack>
                                    </Stack>
                                    <Stack direction="row" spacing={1}>
                                    <Chip icon={<ThumbDown />} label="10" variant="outlined" size="small" color="error" />
                                    <Chip icon={<ThumbUpIcon />} label="10" variant="outlined" size="small" color="success"/>
                                    <Chip icon={<ChatBubbleIcon/>} label="10" variant="outlined"size="small" color="info" />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} className="idea-content">
                                    <Typography align="justify">{idea.idea}</Typography>
                                </Grid>
                                <Divider/>
                                <Grid item className='footer-idea' xs={12}>
                                    <Chip icon={<RemoveRedEye/>} label="10" variant="outlined"size="small" color="primary" />
                                    <Chip icon={<CreateIcon/>} label={Moment(idea.created_at).format('YYYY/MM/DD')} variant="outlined"size="small" color="primary" />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Link>
                </Grid>
                ))}
                
            {/* {
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
            } */}
                
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
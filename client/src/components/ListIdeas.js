import { Box, Grid, Avatar,Tooltip,Typography, Divider, FormControl, InputLabel, Select, MenuItem, Autocomplete, TextField, Paper,Stack, Chip ,Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, IconButton} from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import handleApi from '../service/handleApi'
import { Link } from 'react-router-dom';
import Moment from "moment"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import CreateIcon from '@mui/icons-material/Create';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import '../style/listitem.css'
import ThumbDown from '@mui/icons-material/ThumbDown';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const ListIdeas = () => {
    const { id } = useParams();
    const fileInputRef = useRef(null);
    const [listideas, setlistideas] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() =>{
      retrievelistideas()
      // eslint-disable-next-line 
    },[])
    
    const retrievelistideas = () => {
      handleApi.getIdeas_by_topic()
        .then(response => {
          setlistideas(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    if (!listideas || !listideas.info) {
        return null;
      }
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
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
                                {topic.name}
                            </Typography>
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
                        {
                            listideas.ideas?.map(idea=>(
                            <MenuItem value={1} >{idea.category}</MenuItem>
                            ))
                        }
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
                <Grid item xs={11} md={3} className='topics-table'>
                {listideas.info?.map(topic=>(
                   <Paper className='topic-container'>
                    <Grid container className='topic-placeholder'>
                        <Grid item xs={12} className="topic-header">
                            <Typography variant="body" fontWeight="fontWeightBold" color="white"> About this topic</Typography>
                        </Grid>
                        <Grid item xs={12} className='topic-overall'>
                            <Typography fontSize = {13} align="justify" className='topic-content' > Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.</Typography>
                        </Grid>
                        <Grid item xs={12} className="category">
                        
                            <Grid direction="row" spacing={2}>
                                {listideas.ideas?.map(category =>(
                                <Chip label={category.category} sx={{backgroundColor: "#F2E7D5"}} size="small" onClick={handleClick} className="category_chip"/>          
                            ))}
                            </Grid>
                        </Grid>
                        <Grid xs={12} className="date">
                            <Chip icon={<AccessTimeIcon/>} label={Moment(topic.closureDate).format('YYYY/MM/DD')} size="small" color="warning" variant='outlined' />
                            <Chip icon={<AccessTimeFilledIcon/>} label={Moment(topic.finalClosureDate).format('YYYY/MM/DD')} size="small" color="error" variant='outlined'/>
                        </Grid>
                        <Grid item xs={12} className="create-topic">
                            <Chip icon={<EmojiObjectsIcon/>} label={topic.idea_quantity} size="small" color="primary" className='chip'/>
                            <Chip icon={<EmojiObjectsIcon/>} label="Have idea? Summit here" size="small" color="primary" onClick={handleClickOpen}/>
                            <Dialog open={open} onClose={handleClose} className="create_idea_form">
                                <DialogTitle className="title_idea_form" >{listideas.info[0].name}</DialogTitle>
                                <DialogContent>
                                <DialogContentText>
                                    To contribute idea to this topic, please enter your content. Thank for your contribution
                                </DialogContentText>
                                <Stack direction="row" className='user-inf-form'  spacing={1}>
                                    <Avatar
                                    alt="T"
                                    src="https://b.fssta.com/uploads/application/soccer/headshots/885.vresize.350.350.medium.14.png"
                                    sx={{ width: 30, height: 30 }}
                                    />
                                    <Typography variant="body2">Vo Hoang Tam</Typography>
                                </Stack>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="category">Category</InputLabel>
                                    <Select
                                        labelId="category"
                                        id="category"
                                        // value={age}
                                        label="category"
                                        // onChange={handleChange}
                                    >
                                        {
                                            listideas.categories?.map(category=>(
                                            <MenuItem value={2} >{category.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    label="Your idea here"
                                    type="text"
                                    fullWidth
                                    className='idea-input'
                                    multiline={true}
                                    rows={10}
                                    fontSize={12}
                                />
                                
                                <IconButton
                                    variant="contained"
                                    component="label"
                                    >
                                        <DriveFolderUploadIcon color="primary"/>
                        
                                    <input
                                        type="file"
                                        hidden
                                    />
                                </IconButton>
                                
                                </DialogContent>
                                <DialogActions className='form-action'>
                                <Button onClick={handleClose} className="form-action-button">Submit</Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
               </Paper> 
                ))}
                </Grid>
                <Grid item xs={11} md={6}>
                 {listideas.ideas?.map(idea =>(
                        <Grid i xs={12} >
                            <Link to={"/ideas/"+idea.ideaId}  style={{ textDecoration: 'none'}}>
                                <Paper elevation={4} className="idea" key={idea.ideaId}>
                                    <Grid container>
                                        <Grid item className='header-idea' xs={12}>
                                            <Stack direction="row" spacing={2} className="avatar-category">
                                            <Stack >
                                                <Avatar
                                                alt="T"
                                                src="https://b.fssta.com/uploads/application/soccer/headshots/885.vresize.350.350.medium.14.png"
                                                sx={{ width: 30, height: 30, justifySelf: "center" }}
                                                className='avatar'
                                                />
                                                <Typography variant="subtitle2">{idea.ownerName}</Typography>
                                            </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Chip label={idea.category} sx={{backgroundColor: "#F2E7D5"}} size="small" onClick={handleClick}/>
                                                </Stack>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Chip icon={<ThumbDown />} label={idea.dislikes} variant="outlined" size="small" color="default" />
                                                <Chip icon={<ThumbUpIcon />} label={idea.likes} variant="outlined" size="small" color="default"/>
                                                <Chip icon={<ChatBubbleIcon/>} label={idea.views} variant="outlined"size="small" color="default" />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} className="idea-content">
                                            <Typography align="justify">{idea.idea} </Typography>
                                        </Grid>
                                        <Divider/>
                                        <Grid item className='footer-idea' xs={12}>
                                            <Chip icon={<RemoveRedEye/>} label={idea.views} variant="outlined"size="small" color="default" />
                                            <Chip icon={<CreateIcon/>} label={Moment(idea.createdAt).format('YYYY/MM/DD')} variant="outlined"size="small" color="default" />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Link>
                        </Grid>
                        ))}
                </Grid>
                
                <Grid item xs={11} md={3}>
                </Grid>
            </Grid>
        </Box>
  )
}

export default ListIdeas
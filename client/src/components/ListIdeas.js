import { Box, Grid, Avatar,Tooltip,Typography, Divider, FormControl, InputLabel, Select, MenuItem, Autocomplete, TextField, Paper,Stack, Chip ,Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material'
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
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const ListIdeas = () => {
    const { id } = useParams();

    const [listideas, setlistideas] = useState([]);
    const [open, setOpen] = useState(false);

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
                                <Chip label={category.categoryName} sx={{backgroundColor: "#F2E7D5"}} size="small" onClick={handleClick} className="category_chip"/>          
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
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Subscribe</DialogTitle>
                                <DialogContent>
                                <DialogContentText>
                                    To subscribe to this website, please enter your email address here. We
                                    will send updates occasionally.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                />
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleClose}>Subscribe</Button>
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
                            <Link to={"/ideas/"+idea.id}  style={{ textDecoration: 'none'}}>
                                <Paper elevation={4} className="idea" key={idea.id}>
                                    <Grid container>
                                        <Grid item className='header-idea' xs={12}>
                                            <Stack direction="row" spacing={2} className="avatar-category">
                                            <Stack >
                                                <Avatar
                                                alt="T"
                                                src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/324659855_1288226605056706_1068574274762085817_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=cXa-aiUFgAIAX9zlbbV&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfBivjwSzqPY7MF9RJ8MIYtJ1DMRqctsGhSXkJgf8_rSUQ&oe=63EFBF1D"
                                                sx={{ width: 30, height: 30, justifySelf: "center" }}
                                                className='avatar'
                                                />
                                                <Typography variant="subtitle2">Vo Hoang Tam</Typography>
                                            </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Chip label={idea.categoryName} sx={{backgroundColor: "#F2E7D5"}} size="small" onClick={handleClick}/>
                                                </Stack>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                            <Chip icon={<ThumbDown />} label="10" variant="outlined" size="small" color="default" />
                                            <Chip icon={<ThumbUpIcon />} label="10" variant="outlined" size="small" color="default"/>
                                            <Chip icon={<ChatBubbleIcon/>} label="10" variant="outlined"size="small" color="default" />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} className="idea-content">
                                            <Typography align="justify">{idea.name} </Typography>
                                        </Grid>
                                        <Divider/>
                                        <Grid item className='footer-idea' xs={12}>
                                            <Chip icon={<RemoveRedEye/>} label="10" variant="outlined"size="small" color="default" />
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
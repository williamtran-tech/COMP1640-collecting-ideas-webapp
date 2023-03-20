import { Box, Grid, Avatar,Typography, Divider,FormControlLabel, FormControl, Checkbox,InputLabel, Select, MenuItem, Autocomplete, TextField, Paper,Stack, Chip ,Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormLabel, Switch} from '@mui/material'
import React, { useRef } from 'react'
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
import jwt_decode from 'jwt-decode';
import { Pagination, PaginationItem } from '@mui/material';

const ListIdeas = () => {
    const { id } = useParams();
    const [listideas, setlistideas] = useState([]);
    const [open, setOpen] = useState(false);
    const [checkedTerm, setCheckedTerm] = useState(false);
    const filePicekerRef = useRef(null)
    const [page, setPage] = useState(1);
    const ideasPerPage = 5; // change this to adjust the number of ideas to display per page
    const start = (page - 1) * ideasPerPage;
    const end = start + ideasPerPage;
    const handlePageChange = (event, value) => {
      setPage(value);
    };
    const initialIdea={
        name:"",
        categoryId:"",
        userId:"",
        isAnonymous:0,
        files: [],
    } 
    const [newIdea, setNewIdea]=useState(initialIdea)
    const [selectedCategory, setSelectedCategory] = useState("");
    
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
  
    const handleFileChange = (event) => {
        event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0];
    
        reader.onloadend = () => {
            setSelectedFile(file);
            setImagePreview(reader.result);
        };
    
        reader.readAsDataURL(file);
      };
     const  clear_file= ()=>{
        setImagePreview(null);
     }
    const [inputedIdea, setInputedIdea] = useState("");

    const handleInputChange = (event) => {
    setInputedIdea(event.target.value);
    };
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    useEffect(() =>{
      retrievelistideas()
      // eslint-disable-next-line 
    },[checkedTerm])
     const handleCheckTerm = (event) => {
            setCheckedTerm(event.target.checked);
        };
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
    const handleSubmitIdea=(event) =>{
        event.preventDefault()
        const formData = new FormData();
        formData.append("name", inputedIdea);
        formData.append("categoryId", selectedCategory);
        formData.append("userId", decodedToken.userId);
        formData.append("isAnonymous",0);
        formData.append("file", selectedFile);
      
        if (checkedTerm) {
          handleApi.create_idea(id,formData)
            .then((response) => {
              console.log(response.data);
              setCheckedTerm(false)
            })
            .catch((error) => {
              console.error(error);
            });
            setOpen(false);
        }
    }
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
                            listideas.categories?.map(categorie=>(
                            <MenuItem value={categorie.id} >{categorie.name}</MenuItem>
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
                            <Typography fontSize = {13} align="justify" className='topic-content' >{topic.description}</Typography>
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
                                    <Typography variant="body2">{decodedToken.name}</Typography>
                                    <FormControlLabel control={<Switch defaultChecked size="small" />}  sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }} label="Anonymous" />
                                </Stack>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="category">Category</InputLabel>
                                    <Select
                                        labelId="category"
                                        id="category"
                                        value={selectedCategory}
                                        label="category"
                                        onChange={handleCategoryChange}
                                        // onChange={handleChange}
                                    >
                                        {
                                            listideas.allCategories?.map(category=>(
                                            <MenuItem value={category.id} key={category.id} >{category.name}</MenuItem>
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
                                    rows={6}
                                    fontSize={12}
                                    value={inputedIdea}
                                    onChange={handleInputChange}
                                />
                                <div>
                                   {/* <IconButton onClick={() => filePicekerRef.current.click()}>
                                        <DriveFolderUploadIcon color="primary"  />
                                   </IconButton> */}
                                   <button className="btn" onClick={() => filePicekerRef.current.click()}>
                                        Choose
                                    </button>
                                   <input
                                        ref={filePicekerRef}
                                        accept="image/*, video/*"
                                        onChange={handleFileChange}
                                        type="file"
                                        hidden
                                    />
                                    
                                    {(imagePreview) && (
                                        <button className="btn" onClick={clear_file}>
                                            x
                                        </button>
                                    )}
                                </div>

                                <div className="preview">
                                    {imagePreview != null && <img src={imagePreview} alt=""  className='image_preview'/>}
                                </div>
                                </DialogContent>
                                <DialogActions className='form-action'>
                                    <Stack className='create-action'>
                                        <FormControlLabel
                                        value="start"
                                        control={<Checkbox checked={checkedTerm} onChange={handleCheckTerm} color="primary"/> }
                                        label="I Agree Terms & Coditions"
                                        fullWidth
                                        />
                                        <Button onClick={handleSubmitIdea} className="form-action-button">Submit</Button>
                                    </Stack>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
               </Paper> 
                ))}
                </Grid>
                <Grid item xs={11} md={6}>
                 {listideas.ideas?.slice(start, end).map(idea =>(
                        <Grid  xs={12} >
                            <Link to={"/ideas/"+idea.ideaId}  style={{ textDecoration: 'none'}}>
                                <Paper elevation={4} className="idea" key={idea.ideaId}>
                                    <Grid container>
                                        <Grid item className='header-idea' xs={12}>
                                            <Stack direction="row" spacing={2} className="avatar-category">
                                            <Stack >
                                                <Avatar
                                                alt="T"
                                                src={`http://localhost:5050/${idea.imagePath}`}
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
                <Grid xs={12} className='pagination'>
                    <Pagination
                        count={Math.ceil(listideas.ideas.length / ideasPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        renderItem={(item) => (
                            <PaginationItem
                            component="button"
                            onClick={() => handlePageChange(null, item.page)}
                            {...item}
                            />
                        )}
                    />
                    </Grid>
                </Grid>
                
                <Grid item xs={11} md={3}>
                </Grid>
            </Grid>
        </Box>
  )
}

export default ListIdeas
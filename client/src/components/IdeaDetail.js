import { Box, Grid, Paper, Typography, Stack, Chip, Avatar, Tooltip, Divider,Input, IconButton, AvatarGroup,Breadcrumbs, Popover, Button,Modal, TextField } from '@mui/material'
import Moment from "moment"
import CreateIcon from '@mui/icons-material/Create';
import ThumbDown from '@mui/icons-material/ThumbDown';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import handleApi from '../service/handleApi';
import calculateTimeDiff from '../service/calculateTimeDiff';
import React from 'react'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import config from '../service/headerToken';
import { Link } from 'react-router-dom';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import image from "./images/"
const IdeaDetail = ({token}) => {
    const { id } = useParams();
    const [ideaDetail, setideaDetail] = useState([]);
    const [commentSelected, setCommentSelected]= useState({
        id:'',
        content:''
    })
    const [onpenUpdate, setOpenUpdate]= useState(false)
    const [contentReact, setContentReact] = useState({
            ideaId : id,
            isLike: null
    })
    const initialideaReact = {
        idea_Id: id,
        likeStatus: "",
        dislikeStatus: "",
      };
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => {
        setAnchorEl(null);
        };
        const open = Boolean(anchorEl);
        const handleOpenUpdate =()=>{
            setOpenUpdate(true)
        }
    const handleClick = (event,id, content) => {
        setCommentSelected({
            id: id,
            content:content, 
        })
        setAnchorEl(event.currentTarget);
          };
    const handleCloseUpdate =()=>{
    setOpenUpdate(false)
    }
    const handleUpdateCommentChange = (e) => {
        setCommentSelected({
            ...commentSelected,
            content: e.target.value
          });
    };
    const [react, setReact]= useState(initialideaReact)
    const handleLike =()=>{
        setreacted(true)
        contentReact.isLike= 1
        post_comment(id, contentReact)
    }
    const handleDislike =()=>{
        setreacted(true)
        contentReact.isLike= 0
        post_comment(id, contentReact)
    }

    const initialideaState = {
        content: "",
        userId: localStorage.getItem("userid"),
        ideaId: id
      };
      const [comment, setcomment] = useState(initialideaState);
      const [commented, setcommented] = useState(false);
      const [reacted, setreacted] = useState(false);
      const [extension, setExtension]= useState('')
    useEffect(() =>{
            retrieveideaDetail()
      },[commented, reacted])
    const retrieveideaDetail = () => {
         handleApi.getIdeaDetail_by_idea(id)
          .then(response => {
            setideaDetail(response.data);
            setExtension(response.data.idea[0].filePath.substring(response.data.idea[0].filePath.lastIndexOf('.') + 1).toLowerCase())
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };
      if(ideaDetail&&ideaDetail.dislikedBy){
          if(ideaDetail.dislikedBy.some(user=>user.User.id === token.userId)){
            react.dislikeStatus="#F7F7F7" 
            console.log("ok")
          }else{
             react.dislikeStatus=""
          }
      }
      if(ideaDetail&&ideaDetail.likedBy){
        if(ideaDetail.likedBy.some(user=>user.User.id === token.userId)){
         react.likeStatus="#F7F7F7"
        console.log("ok")
        }else{
           react.likeStatus=""
        }
    }
      const post_comment = (id, data) => {
          console.log(data)
        handleApi.react(id, data)
         .then(response => {
            setreacted(false)
           console.log(response.data);
         })
         .catch(e => {
           console.log(e);
         });
     };
      if (!ideaDetail || !ideaDetail.idea || !ideaDetail.views || !ideaDetail.react) {
        return null;
      }
      
      const handleInputChange = event => {
        const { name, value } = event.target;
        setcomment({ ...comment, [name]: value });
      };
      console.log(extension)
      const handleComment = e => {
        e.preventDefault();
        var data = {
          content: comment.content,
          userId: comment.userId,
          ideaId: comment.ideaId,
          isAnonymous: 0,
        };
        if(comment.content == '')
            {
                console.log("")
            }else{
                handleApi.post_comment(data)
            .then(response => {
                setcommented(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
            setcommented(false);
            setcomment(initialideaState)
            }
      };
      const handleCommentAnonymous = e => {
        e.preventDefault();
        var data = {
          content: comment.content,
          userId: comment.userId,
          ideaId: comment.ideaId, 
          isAnonymous: 1,
        };
        if(comment.content == '')
            {
                console.log("")
            }else{
                handleApi.post_comment(data)
            .then(response => {
                setcommented(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
            setcommented(false);
            setcomment(initialideaState)
            }
      };
      const handleUpdateComment = (e) => {
        e.preventDefault();
        const data={
            id: commentSelected.id,
            content: commentSelected.content
        }
        handleApi.update_comment(data).then(response=>{
            console.log(response.data)

        }).catch(error=>{
            console.error(error);
        })
        handleCloseUpdate()
        // setCategoryname('');
      };
  return (
    <Box>
        <Grid container justifyContent="center">
            <Grid item xs={11} md={6}>
            <Breadcrumbs sx={{color:"black"}} separator="›" className='breadcrumbs' >
                                    <Link underline="hover" key="1"  to="/topics" style={{color: "black"}}>
                                        All topic
                                    </Link>
                                    <Link
                                    underline="hover"
                                    key="2"
                                    style={{color: "black"}}
                                    to={`/topics/${ideaDetail.topicInfo.id}`}
                                    >
                                        {ideaDetail.topicInfo.name}
                                    </Link>
                                    <Link
                                    underline="hover"
                                    key="2"
                                    style={{color: "black"}}
                                    to={`/ideas/${ideaDetail.idea[0].id}`}
                                    >
                                        {ideaDetail.idea[0].name}
                                    </Link>
                                </Breadcrumbs>
            <Paper elevation={4} className="idea" key={ideaDetail.idea[0].id}>
                    <Grid container>
                        <Grid item className='header-idea' xs={12}>
                            <Stack direction="row" spacing={2} className="avatar-category">
                                {
                                    ideaDetail.idea[0].isAnonymous ? (
                                        <Stack >
                                            <Avatar
                                            alt="A"
                                            sx={{ width: 30, height: 30, justifySelf: "center" }}
                                            className='avatar'
                                            />
                                            <Typography variant="subtitle2" className='name-user'>Anonymous</Typography>
                                        </Stack>
                                    ): (
                                    <Link to={`/user/${ideaDetail.idea[0].User.id}`} style={{textDecoration:"none", color:"#000"}}>
                                    <Stack >
                                        <Avatar
                                        src={`http://localhost:5050/${ideaDetail.idea[0].User.profileImage}`}
                                        sx={{ width: 30, height: 30, justifySelf: "center" }}
                                        className='avatar'
                                        />
                                        <Typography variant="subtitle2" className='name-user'>{ideaDetail.idea[0].User.fullName}</Typography>
                                    </Stack>
                                     </Link>
                                    )
                                }
                                
                                <Stack direction="row" spacing={1}>
                                    <Chip label={ideaDetail.idea[0].Category.name} sx={{backgroundColor: "#F7F7F7"}} size="small" onClick={"handleClick"}/>
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                            <Chip icon={<ThumbUpIcon style={{color: `${react.likeStatus}`}}/>} label={ideaDetail.react[0].Likes} variant="outlined" size="small"  onClick={handleLike}/>
                            <Chip icon={<ThumbDown style={{color: `${react.dislikeStatus}`}}/>} label={ideaDetail.react[0].Dislikes} variant="outlined" size="small"  onClick={handleDislike}/>
                            <Chip icon={<ChatBubbleIcon/>} label={ideaDetail.nComments} variant="outlined"size="small" sx={{backgroundColor: "#F7F7F7"}} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} className="idea-content">
                            <Typography align="justify" variant="subtitle2"> {ideaDetail.idea[0].name} </Typography>
                            {
                                ideaDetail.idea[0].filePath &&(
                                    <>
                                    <Box>
                                        { extension === 'jpg' || extension === 'jpeg' || extension === 'png' 
                                        ? ( 
                                        <img src={`http://localhost:5050/${ideaDetail.idea[0].filePath}`} alt=""  className='imageIdea_preview'/>
                                        )
                                        :(          
                                        <Link to={`http://localhost:5050/${ideaDetail.idea[0].filePath}`} style={{textDecoration: 'none'}}>
                                             <Chip icon={<EmojiObjectsIcon/>} label="Attachment" size="small" color="primary" className="chip" sx={{backgroundColor: "#F9A602", marginTop: 1}} />
                                        </Link>
                              
                                        )
                                        }
                                   
                                         </Box>
                                    </>
                                )
                            }
                        </Grid>
                        <Grid item className='footer-idea' xs={12}>
                            {
                                ideaDetail.viewedBy &&(
                                    <AvatarGroup max={3} sx={{
                                        '& .MuiAvatar-root': { width: 15, height: 15, fontSize: 10 },
                                      }}>
                                        {ideaDetail.viewedBy.map(view =>(
                                             <Avatar alt="Remy Sharp" src={`http://localhost:5050/${view.User.profileImage}`} />
                                        ))}
                                    </AvatarGroup>
                                ) 
                            }
                            <Chip icon={<CreateIcon/>} label={Moment(ideaDetail.idea[0].createdAt).format('YYYY/MM/DD')} size="small" sx={{backgroundColor: "#6D9886"}} />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
        <Grid container justifyContent="center">
            <Grid item xs={11} md={6} className="comment-container">
                <Typography>All comment</Typography>
                <Stack className='comment'>
                    {
                        ideaDetail.comments?.map(comment=>(
                    <Grid> 
                        <Stack direction="row" spacing={1} className="comment-item">
                                    <Tooltip title={comment.owner} arrow>
                                        <Avatar
                                        alt="T"
                                        src={`http://localhost:5050/${comment.imagePath}`}
                                        sx={{ width: 30, height: 30  }}
                                        />
                                    </Tooltip>
                                    <Stack direction="row" className='comment-text'>
                                        <Stack>
                                            <Stack direction="row" spacing={1}> 
                                             <Typography variant="body2" className='name-user'>{comment.owner}</Typography>
                                             <Typography variant="body2" className='time-comment'> {calculateTimeDiff(comment.updatedAt)}</Typography>
                                            </Stack>
                                            <Typography variant="subtitle2">{comment.content}</Typography>
                                        </Stack>
                                        
                                       <IconButton onClick={(event)=>{handleClick(event, comment.id, comment.content)}}>
                                            <MoreVertIcon></MoreVertIcon>
                                        </IconButton>
                                    </Stack> 
                        </Stack>
                    </Grid>
                        ))
                    }
                    {
                        ideaDetail.anoComments?.map(comment=>(
                    <Grid> 
                        <Stack direction="row" spacing={1} className="comment-item">
                                    <Tooltip title={comment.owner} arrow>
                                        <Avatar
                                        alt="A"
                                        sx={{ width: 30, height: 30  }}
                                        />
                                    </Tooltip>
                                    <Stack direction="row" className='comment-text'>
                                        <Stack>
                                            <Stack direction="row" spacing={1}> 
                                             <Typography variant="body2" className='name-user'>Anonymous</Typography>
                                             <Typography variant="body2" className='time-comment'> {calculateTimeDiff(comment.updatedAt)}</Typography>
                                            </Stack>
                                            <Typography variant="subtitle2">{comment.content}</Typography>
                                        </Stack>
                                       <IconButton onClick={(event)=>{handleClick(event, comment.id, comment.content)}}>
                                            <MoreVertIcon></MoreVertIcon>
                                    </IconButton>
                                    </Stack> 
                        </Stack>
                    </Grid>
                        ))
                    }
                </Stack>
                {ideaDetail&& ideaDetail.topicInfo&& new Date(ideaDetail.topicInfo.finalClosureDate)> new Date()&&(
                    <Grid> 
                    <form onSubmit={handleComment}>
                        <Stack direction="row" spacing={1} className="comment-item">
                                    <Tooltip title="VO HOANG TAM" arrow>
                                        <Avatar
                                        alt="T"
                                        src={token&&`http://localhost:5050/${token.imagePath}`}
                                        sx={{ width: 30, height: 30  }}
                                        />
                                    </Tooltip>
                                        <Box flexGrow={1}>
                                            <Input placeholder="Comment..." className='comment-input' sx={{borderBottomColor: "#6D9886"}} id='comment-input' name='content' 
                                            value={comment.content} onChange={handleInputChange} />
                                        </Box>
                                        <SpeedDial
                                            ariaLabel="SpeedDial basic example"
                                            sx={{position:"relative",  color: "#6D9886"}}
                                            direction={'down'}
                                            icon={<SendIcon fontSize='small' />}
                                            FabProps={{size: 'small',
                                            sx: {
                                                bgcolor: '#6D9886',
                                                '&:hover': {
                                                  bgcolor: '#6D9886',
                                                }
                                              }}}
                                            className="send_button"
                                        >
                                            <SpeedDialAction
                                            disableHoverListener
                                            disableFocusListener
                                            disableInteractive
                                            disableTouchListener
                                            className='send_option'
                                                icon={
                                                    <>
                                                    <IconButton type='submit'>
                                                        <AccountCircleIcon sx={{color: "#6D9886"}} ></AccountCircleIcon>
                                                    </IconButton>
                                                    <IconButton onClick={handleCommentAnonymous}>
                                                        <NoAccountsIcon sx={{color: "#6D9886"}} ></NoAccountsIcon>
                                                    </IconButton>
                                                    </>
                                                    }
                                            />

                                        </SpeedDial>
                        </Stack>
                        </form>
                    </Grid>
                )}
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                >
                    <Stack spacing={1}>
                        <Button size='small' onClick={handleOpenUpdate}> Edit</Button>
                        <Button size='small' onClick={1}> Delete</Button>
                    </Stack>
                    
                </Popover>
            </Grid>
        </Grid>
        <div>
        <Modal open={onpenUpdate} onClose={handleCloseUpdate} aria-labelledby="modal-title"
            aria-describedby="modal-description" 
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box className='createNewCategory'>
                    <h2>Update comment</h2>
                    <form onSubmit={handleUpdateComment}>
                    <TextField
                        label="Comment"
                        variant="outlined"
                        value={commentSelected.content}
                        onChange={handleUpdateCommentChange}
                        fullWidth
                    />
                    <Button type="submit" variant="contained" className='create_user_btn'>
                        Update
                    </Button>
                    </form>
                </Box>
                </Modal>
    </div>
    </Box>
  )
}

export default IdeaDetail
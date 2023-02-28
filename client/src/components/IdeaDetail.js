import { Box, Grid, Paper, Typography, Stack, Chip, Avatar, Tooltip, Divider,Input, IconButton } from '@mui/material'
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
import config from '../service/headerToken';

const IdeaDetail = () => {
    const { id } = useParams();
    const [ideaDetail, setideaDetail] = useState([]);
    const initialideaReact = {
        user_Id: localStorage.getItem("userid"),
        idea_Id: id,
        isLike:false,
        likeStatus: "",
        isDislike:false,
        dislikeStatus: "",
      };
    const [react, setReact]= useState(initialideaReact)
    const handleLike =()=>{
        if(react.isDislike || !react.isLike){
            setReact({
                user_Id: "",
                idea_Id: localStorage.getItem("userid"),
                isLike:true,
                likeStatus: "#F7F7F7",
                isDislike:false,
                dislikeStatus: "",
            })
        }
        else if(react.isLike){
            setReact({
                user_Id: "",
                idea_Id: localStorage.getItem("userid"),
                isLike:false,
                likeStatus: "",
                isDislike:false,
                dislikeStatus: "",
            })
        }
    }
    const handleDislike =()=>{
        if(!react.isDislike || react.isLike){
            setReact({
                user_Id: "",
                idea_Id: localStorage.getItem("userid"),
                isLike:false,
                likeStatus: "",
                isDislike:true,
                dislikeStatus: "#F7F7F7",
            })
        }
        else if(react.isDislike){
            setReact({
                user_Id: "",
                idea_Id: localStorage.getItem("userid"),
                isLike:false,
                likeStatus: "",
                isDislike:false,
                dislikeStatus: "",
            })
        }
    }

    const initialideaState = {
        content: "",
        userId: localStorage.getItem("userid"),
        ideaId: id
      };
      const [comment, setcomment] = useState(initialideaState);
      const [commented, setcommented] = useState(false);
      
    // useEffect(()=>{
    //     retrieveideaDetail()
    // },[])
    const token= localStorage.getItem("token")

    useEffect(() =>{
        if(config){
            retrieveideaDetail()
        }
        
      },[commented])
    const retrieveideaDetail = () => {
         handleApi.getIdeaDetail_by_idea(id)
          .then(response => {
            setideaDetail(response.data);
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
      const handleComment = e => {
        e.preventDefault();
        var data = {
          content: comment.content,
          userId: comment.userId,
          ideaId: comment.ideaId
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

  return (
    <Box>
        <Grid container justifyContent="center">
            <Grid item xs={11} md={6}>
            <Paper elevation={4} className="idea" key={"idea.id"}>
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
                                    <Typography variant="subtitle2" className='name-user'>{ideaDetail.idea[0].User.fullName}</Typography>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Chip label={ideaDetail.idea[0].Category.name} sx={{backgroundColor: "#F7F7F7"}} size="small" onClick={"handleClick"}/>
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                            <Chip icon={<ThumbDown style={{color: `${react.likeStatus}`}}/>} label={ideaDetail.react[0].Dislikes} variant="outlined" size="small"  onClick={handleLike}/>
                            <Chip icon={<ThumbUpIcon style={{color: `${react.dislikeStatus}`}}/>} label={ideaDetail.react[0].Likes} variant="outlined" size="small"  onClick={handleDislike}/>
                            <Chip icon={<ChatBubbleIcon/>} label={ideaDetail.views} variant="outlined"size="small" sx={{backgroundColor: "#F7F7F7"}} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} className="idea-content">
                            <Typography align="justify" variant="subtitle2"> {ideaDetail.idea[0].name} </Typography>
                        </Grid>
                        <Divider/>
                        <Grid item className='footer-idea' xs={12}>
                            <Chip icon={<RemoveRedEye/>} label={Number(ideaDetail.views)-2} size="small" sx={{backgroundColor: "#6D9886"}} />
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
                                        src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/324659855_1288226605056706_1068574274762085817_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=cXa-aiUFgAIAX9zlbbV&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfBivjwSzqPY7MF9RJ8MIYtJ1DMRqctsGhSXkJgf8_rSUQ&oe=63EFBF1D"
                                        sx={{ width: 30, height: 30  }}
                                        />
                                    </Tooltip>
                                    <Stack className='comment-text'>
                                        <Stack direction="row" spacing={1}> 
                                             <Typography variant="body2" className='name-user'>{comment.owner}</Typography>
                                             <Typography variant="body2" className='time-comment'> {calculateTimeDiff(comment.updatedAt)}</Typography>
                                        </Stack>
                                        <Typography variant="subtitle2">{comment.content}</Typography>
                                    </Stack>
                        </Stack>
                    </Grid>
                        ))
                    }
                    
                </Stack>
                <Grid> 
                    <form onSubmit={handleComment}>
                        <Stack direction="row" spacing={1} className="comment-item">
                                    <Tooltip title="VO HOANG TAM" arrow>
                                        <Avatar
                                        alt="T"
                                        src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/324659855_1288226605056706_1068574274762085817_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=cXa-aiUFgAIAX9zlbbV&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfBivjwSzqPY7MF9RJ8MIYtJ1DMRqctsGhSXkJgf8_rSUQ&oe=63EFBF1D"
                                        sx={{ width: 30, height: 30  }}
                                        />
                                    </Tooltip>
                                        <Input placeholder="Comment..." className='comment-input' sx={{borderBottomColor: "#6D9886"}} id='comment-input' name='content' value={comment.content} onChange={handleInputChange}/>
                                    <IconButton type='submit'>
                                         <SendIcon sx={{color: "#6D9886"}} ></SendIcon>
                                    </IconButton>
                        </Stack>
                        </form>
                    </Grid>
            </Grid>
        </Grid>
    </Box>
  )
}

export default IdeaDetail
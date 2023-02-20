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
import React from 'react'

const IdeaDetail = () => {
    const { id } = useParams();
    const [ideaDetail, setideaDetail] = useState([]);
    const initialideaState = {
        content: ""
      };
      const [comment, setcomment] = useState(initialideaState);
      const [commented, setcommented] = useState(false);
    // useEffect(()=>{
    //     retrieveideaDetail()
    // },[])
    useEffect(() =>{
        retrieveideaDetail()
        // eslint-disable-next-line 
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
      if (!ideaDetail || !ideaDetail.idea) {
        return null;
      }
      const handleInputChange = event => {
        const { name, value } = event.target;
        setcomment({ ...comment, [name]: value });
      };
      const post_comment = () => {
        var data = {
          content: comment.content,
          userId: comment.userId,
          ideaId: comment.ideaId
        };
        if(comment.content == '')
            {
                console.log("cak")
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
            setcomment({
                content: ""
            })
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
                                    <Typography variant="subtitle2">{ideaDetail.idea[0].User.fullName}</Typography>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Chip label={ideaDetail.idea[0].Category.name} color="success" size="small" onClick={"handleClick"}/>
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                            <Chip icon={<ThumbDown />} label="10" variant="outlined" size="small" color="default" />
                            <Chip icon={<ThumbUpIcon />} label="10" variant="outlined" size="small" color="default"/>
                            <Chip icon={<ChatBubbleIcon/>} label="10" variant="outlined"size="small" color="default" />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} className="idea-content">
                            <Typography align="justify" variant="subtitle2"> {ideaDetail.idea[0].name} </Typography>
                        </Grid>
                        <Divider/>
                        <Grid item className='footer-idea' xs={12}>
                            <Chip icon={<RemoveRedEye/>} label="10" variant="outlined"size="small" color="default" />
                            <Chip icon={<CreateIcon/>} label={Moment(ideaDetail.idea[0].createdAt).format('YYYY/MM/DD')} variant="outlined"size="small" color="default" />
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
                                    <Typography className='comment-text' variant="subtitle2">{comment.content}</Typography>
                        </Stack>
                    </Grid>
                        ))
                    }
                    
                </Stack>
                <Grid> 
                        <Stack direction="row" spacing={1} className="comment-item">
                                    <Tooltip title="VO HOANG TAM" arrow>
                                        <Avatar
                                        alt="T"
                                        src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/324659855_1288226605056706_1068574274762085817_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=cXa-aiUFgAIAX9zlbbV&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfBivjwSzqPY7MF9RJ8MIYtJ1DMRqctsGhSXkJgf8_rSUQ&oe=63EFBF1D"
                                        sx={{ width: 30, height: 30  }}
                                        />
                                    </Tooltip>
                                    <Input placeholder="Comment..." className='comment-input' id='comment-input' name='content' value={comment.content} onChange={handleInputChange}/>
                                    <IconButton>
                                         <SendIcon color='primary' onClick={post_comment}></SendIcon>
                                    </IconButton>
                                   
                        </Stack>
                    </Grid>
            </Grid>
        </Grid>
    </Box>
  )
}

export default IdeaDetail
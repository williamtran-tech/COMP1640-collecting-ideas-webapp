import { Box, Grid, Paper, Typography, Stack, Chip, Avatar, Tooltip, Divider,Input, IconButton } from '@mui/material'
import Moment from "moment"
import CreateIcon from '@mui/icons-material/Create';
import ThumbDown from '@mui/icons-material/ThumbDown';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import React from 'react'

const IdeaDetail = () => {
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
                                    <Typography variant="subtitle2">Vo Hoang Tam</Typography>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Chip label={"idea.category"} color="success" size="small" onClick={"handleClick"}/>
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                            <Chip icon={<ThumbDown />} label="10" variant="outlined" size="small" color="default" />
                            <Chip icon={<ThumbUpIcon />} label="10" variant="outlined" size="small" color="default"/>
                            <Chip icon={<ChatBubbleIcon/>} label="10" variant="outlined"size="small" color="default" />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} className="idea-content">
                            <Typography align="justify" variant="subtitle2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). </Typography>
                        </Grid>
                        <Divider/>
                        <Grid item className='footer-idea' xs={12}>
                            <Chip icon={<RemoveRedEye/>} label="10" variant="outlined"size="small" color="default" />
                            <Chip icon={<CreateIcon/>} label={Moment("idea.created_at").format('YYYY/MM/DD')} variant="outlined"size="small" color="default" />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
        <Grid container justifyContent="center">
            <Grid item xs={11} md={6} className="comment-container">
                <Typography>All comment</Typography>
                <Stack className='comment'>
                    <Grid> 
                        <Stack direction="row" spacing={1} className="comment-item">
                                    <Tooltip title="VO HOANG TAM" arrow>
                                        <Avatar
                                        alt="T"
                                        src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/324659855_1288226605056706_1068574274762085817_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=cXa-aiUFgAIAX9zlbbV&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfBivjwSzqPY7MF9RJ8MIYtJ1DMRqctsGhSXkJgf8_rSUQ&oe=63EFBF1D"
                                        sx={{ width: 30, height: 30  }}
                                        />
                                    </Tooltip>
                                    <Typography className='comment-text' variant="subtitle2">hello</Typography>
                        </Stack>
                    </Grid>
                    <Grid> 
                        <Stack direction="row" spacing={1} className="comment-item">
                                    <Tooltip title="VO HOANG TAM" arrow>
                                        <Avatar
                                        alt="T"
                                        src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/324659855_1288226605056706_1068574274762085817_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=cXa-aiUFgAIAX9zlbbV&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfBivjwSzqPY7MF9RJ8MIYtJ1DMRqctsGhSXkJgf8_rSUQ&oe=63EFBF1D"
                                        sx={{ width: 30, height: 30  }}
                                        />
                                    </Tooltip>
                                    <Typography className='comment-text' variant="subtitle2">It is a long established fact that a reader will be distracted by</Typography>
                        </Stack>
                    </Grid>
                    <Grid> 
                        <Stack direction="row" spacing={1} className="comment-item">
                                    <Tooltip title="VO HOANG TAM" arrow>
                                        <Avatar
                                        alt="T"
                                        src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/324659855_1288226605056706_1068574274762085817_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=cXa-aiUFgAIAX9zlbbV&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfBivjwSzqPY7MF9RJ8MIYtJ1DMRqctsGhSXkJgf8_rSUQ&oe=63EFBF1D"
                                        sx={{ width: 30, height: 30  }}
                                        />
                                    </Tooltip>
                                    <Typography className='comment-text' variant="subtitle2">It is a long established fact that a reader </Typography>
                        </Stack>
                    </Grid>
                    <Grid> 
                        <Stack direction="row" spacing={1} className="comment-item">
                                    <Tooltip title="VO HOANG TAM" arrow>
                                        <Avatar
                                        alt="T"
                                        src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/324659855_1288226605056706_1068574274762085817_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=cXa-aiUFgAIAX9zlbbV&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfBivjwSzqPY7MF9RJ8MIYtJ1DMRqctsGhSXkJgf8_rSUQ&oe=63EFBF1D"
                                        sx={{ width: 30, height: 30  }}
                                        />
                                    </Tooltip>
                                    <Typography className='comment-text' variant="subtitle2">hello</Typography>
                        </Stack>
                    </Grid>
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
                                    <Input placeholder="Comment..." className='comment-input' />
                                    <IconButton>
                                         <SendIcon color='primary' onClick={0}></SendIcon>
                                    </IconButton>
                                   
                        </Stack>
                    </Grid>
            </Grid>
        </Grid>
    </Box>
  )
}

export default IdeaDetail
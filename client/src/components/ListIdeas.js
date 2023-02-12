import { Box, Grid, Avatar, IconButton,Tooltip,Typography, Card, CardActions, CardContent, Link, Badge } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import React from 'react'
import '../style/listitem.css'

const ListIdeas = () => {
  return (
        <Box>
            <Grid container className='listidea'> 
                <Grid item xs={11} md={9} padding={3} className='idea'>
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
                        <Grid item xs={1} className='react-container'>
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
                </Grid>
                <Grid item xs={11} md={9} padding={3} className='idea'>
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
                </Grid>
                <Grid item xs={11} md={9} padding={3} className='idea'>
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
                </Grid>
                <Grid item xs={11} md={9} padding={3} className='idea'>
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
                </Grid>
                <Grid item xs={11} md={9} padding={3} className='idea'>
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
                </Grid>
            </Grid>
        </Box>
  )
}

export default ListIdeas
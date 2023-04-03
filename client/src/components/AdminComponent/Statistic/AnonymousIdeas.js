import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid,ListItem,ListItemAvatar,Avatar,ListItemText,Chip,Link  } from '@material-ui/core';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CategoryIcon from '@mui/icons-material/Category';

import moment from 'moment';
import { Stack } from '@mui/material';
const AnonymousIdeas = ({anonymousIdeas}) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
  return (
        <Grid container>
            <Grid item xs={12}>
                <Typography className='title_chart' variant="body1" >Anonymous Ideas</Typography>
            </Grid>
            <Grid item xs={12}>
                {
                    anonymousIdeas.map(idea=>(
                        <Accordion expanded={expanded === idea.id} onChange={handleChange(idea.id)}>
                            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1bh-content" id="panel1bh-header" style={{backgroundColor:"#6D9886", borderRadius:"5px"}}>
                               <Stack direction={"row"} spacing={2}>
                                   <Typography style={{fontWeight:"bolder"}}>{idea.name}</Typography>
                                    <Typography >{moment(idea.updatedAt).format("YYYY/MM/DD")}</Typography>
                               </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ListItem key={idea.id} component={Link} to={`/ideas/${idea.id}`} style={{textDecoration: "none"}}>
                                    <ListItemAvatar>
                                        <Avatar alt={idea.User.fullName} src={`http://localhost:5050/${idea.User.profileImage}`} />
                                    </ListItemAvatar>
                                    <ListItemText primary={idea.User.fullName} secondary={idea.User.email}  primaryTypographyProps={{ style: { maxWidth: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1 } }}/>
                                    <Stack spacing={1}>
                                         <Chip label={idea.Topic.name} variant="outlined"  size='small'/> 
                                         <Chip icon={<CategoryIcon />} label={idea.Category.name} variant="outlined"  size='small'/> 
                                    </Stack>
                                </ListItem>
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
            
            </Grid>
        </Grid>

    
  )
}

export default AnonymousIdeas
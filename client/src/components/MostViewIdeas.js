import React, { useEffect, useState } from 'react'
import { List, ListItem, ListItemText, ListItemAvatar, Avatar,Chip, Collapse,ListSubheader  } from '@material-ui/core';
import { ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import { Stack } from '@mui/system';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
const MostViewIdeas = ({ideas}) => {
  const [openCollapse, setOpenCollapse] = useState(false);

  const handleOpenCollapse = () => {
    setOpenCollapse(!openCollapse);
  };
  return (
   
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Overview
        </ListSubheader>
      }
    >
      <ListItemButton
        onClick={handleOpenCollapse}
        sx={{ backgroundColor: '#6D9886', borderRadius: '10px' }}
      >
        <ListItemText primary="Top 5 View Ideas" />
        {openCollapse ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCollapse} timeout="auto">
        <List component="div" disablePadding>
          {ideas.map((idea) => (
            <ListItem key={idea.id} component={Link} to={`/ideas/${idea.id}`}>
              <ListItemAvatar>
                <Avatar
                  alt={idea.User.fullName}
                  src={`http://localhost:5050/${idea.User.profileImage}`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={idea.name}
                secondary={idea.createdAt}
                primaryTypographyProps={{
                  style: {
                    maxWidth: '100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 1,
                  },
                }}
              />
              <Chip
                icon={<RemoveRedEye />}
                label={idea.views}
                variant="outlined"
                size="small"
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  )
}
export default MostViewIdeas
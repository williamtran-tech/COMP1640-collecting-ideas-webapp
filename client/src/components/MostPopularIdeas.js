import React from 'react'
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
const MostPopularIdeas = ({ideas}) => {
    return (
        <List component="div" disablePadding>
          {ideas.map((idea) => (
            <ListItem key={idea.id} component={Link} to={`/ideas/${idea.id}`}>
              <ListItemAvatar>
                <Avatar alt={idea.User.fullName} src={`http://localhost:5050/${idea.User.profileImage}`} />
              </ListItemAvatar>
              <ListItemText primary={idea.name} secondary={idea.createdAt} primaryTypographyProps={{ style: { maxWidth: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1 } }}/>
              <Chip icon={<ThumbUpIcon />} label={idea.nLikes} variant="outlined"  size='small'/> 
            </ListItem>
          ))}
        </List>
      )
}

export default MostPopularIdeas
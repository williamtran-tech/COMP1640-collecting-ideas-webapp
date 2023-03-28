
import React from 'react'
import { List, ListItem, ListItemText, ListItemAvatar, Avatar,Chip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import '../style/listitem.css'
const LastestComment = ({comment}) => {
  return (
      
    <List component="div" disablePadding>
          { comment&&comment.map((comment) => (
            <ListItem key={comment.id} component={Link} to={`/ideas/${comment.Idea.id}`}>
              <ListItemAvatar>
                <Avatar alt={comment.User.fullName} src={`http://localhost:5050/${comment.User.profileImage}`} />
              </ListItemAvatar>
              <ListItemText primary={comment.content} secondary={comment.createdAt} primaryTypographyProps={{ style: { maxWidth: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1 } }}/>
            </ListItem>
          ))}
        </List>
  )
}

export default LastestComment
import { Box, Grid, Paper, Badge, IconButton,Popover } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FolderZipIcon from '@mui/icons-material/FolderZip';
import { Button, Stack, Typography } from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import handleApi from '../../../service/handleApi';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
const CategoryList = ({updated, setUpdated}) => {
    const [category, setCategory] =useState([])
    const [categorySelected, setCategorySelected]=useState({})
    const [onpenUpdate, setOpenUpdate] = useState(false)
    const [onpenDelete, setOpenDelete] = useState(false)
    useEffect(()=>{
        handleApi.admin_get_category().then(response=>{
            console.log(response.data)
            setCategory(response.data)
        }).catch(error=>{
            console.error(error)
        })
    }, [updated])
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event,id, name) => {
        setCategorySelected({
            id: id,
            name:name, 
        })
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
    setAnchorEl(null);
    };
      const open = Boolean(anchorEl);
    const hanldeOpenUpdate =()=>{
    setOpenUpdate(true)
    }
    const hanldeOpenDelete =()=>{
    setOpenDelete(true)
    }
  return (
    <div>
       <Grid container >
           {
               category&&category.categories&& category.categories.map(categoryitem=>(
                <Grid item className='listcategory_container' xs={12} md={4} lg={3}>
                    <Paper className='category_container'>
                        <Stack direction={"row"} spacing={2} className='category_name'>
                            <FolderZipIcon fontSize='large'></FolderZipIcon>
                            <Typography> {categoryitem.name}</Typography>
                        </Stack>
                        <div className='category_option'>
                        <Badge badgeContent={categoryitem.idea_quantity} color="primary">
                                    <EmojiObjectsIcon style={{ color: '#fefae0'}}/>
                        </Badge>
                        
                        <IconButton onClick={(event)=>{handleClick(event, categoryitem.id, categoryitem.name)}}>
                            <MoreVertIcon></MoreVertIcon>
                        </IconButton>
                        </div>
                    </Paper>
                </Grid>
               ))
           }
       </Grid>
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
            <Button size='small' onClick={hanldeOpenUpdate}> Update</Button>
            <Button size='small' onClick={hanldeOpenDelete}> Delete</Button>
        </Stack>
        
      </Popover>
      
      <UpdateModal onpenUpdate={onpenUpdate} setOpenUpdate={setOpenUpdate} categorySelected={categorySelected}  updated={updated} setUpdated={setUpdated}></UpdateModal>
      <DeleteModal onpenDelete={onpenDelete} setOpenDelete={setOpenDelete} categorySelected={categorySelected}  updated={updated} setUpdated={setUpdated}></DeleteModal>
    </div>
  )
}

export default CategoryList
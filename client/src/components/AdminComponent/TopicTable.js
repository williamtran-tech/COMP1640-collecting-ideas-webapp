
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, IconButton, Grid, Typography, Dialog, DialogActions, DialogContent,DialogTitle, TextField } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useState, useEffect } from 'react';
import handleApi from '../../service/handleApi';
const TopicTable = () => {
    const [listTopic, setListTopic]= useState()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [formTopic, setFormTopic] = useState({
      name: '',
      description: '',
      closureDate: '',
      finalClosureDate: '',
    });

    useEffect(() =>{
        const retrievelisttopics = () => {
        handleApi.admin_getListTopic()
          .then(response => {
            setListTopic(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };
        retrievelisttopics()
        // eslint-disable-next-line 
      },[submited])
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleTopicChange = (event) => {
      const { name, value } = event.target;
      setFormTopic((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic here
      console.log(formTopic)
      handleApi.admin_create_idea(formTopic)
        .then(response => {
          console.log(response.data);
          setSubmited(true)
        })
        .catch(e => {
          console.log(e);
        });
        setSubmited(false)
        setOpen(false);
    };
  
  return (
    <div> 
       <Paper className='header_admin'>
          <Typography> Topic Management</Typography>
          <Button variant="contained" startIcon={<BorderColorIcon color='primary'></BorderColorIcon>} className='create_new_btn' onClick={handleClickOpen}>
              New Topic
          </Button>
          <Dialog open={open} onClose={handleClose} className="create_topic_form">
              <DialogTitle className="title_idea_form" >Create New Topic</DialogTitle>
              <DialogContent>
              <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="name"
                        label="Name"
                        value={formTopic.name}
                        onChange={handleTopicChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="description"
                        label="Description"
                        margin="dense"
                        multiline
                        rows={4}
                        type="text"
                        value={formTopic.description}
                        onChange={handleTopicChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        
                        fullWidth
                        name="closureDate"
                        label="Closure Date"
                        type="datetime-local"
                        value={formTopic.closureDate}
                        onChange={handleTopicChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="finalClosureDate"
                        label="Final Date"
                        type="datetime-local"
                        value={formTopic.finalDate}
                        onChange={handleTopicChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions className='form-action'>
                  {/* <Stack className='create-action'>
                      <FormControlLabel
                      value="start"
                      control={<Checkbox checked={checkedTerm} onChange={handleCheckTerm} color="primary"/> }
                      label="I Agree Terms & Coditions"
                      fullWidth
                      />
                      <Button onClick={handleSubmitIdea} className="form-action-button">Submit</Button>
                  </Stack> */}
              </DialogActions>
          </Dialog>
       </Paper>
       <Paper sx={{ width: '100%', overflow: 'hidden' }} className="topics_table_list">
          <TableContainer sx={{ maxHeight: '100vh'}}>
              <Table stickyHeader aria-label="a dense table">
                <TableHead >
                  <TableRow className='header_topic_list' sx={{
                    "& th": {
                        color:"white",
                        backgroundColor: "hsla(212, 92%, 45%, 1)",
                        textTransform:"uppercase",
                    }
                    }}>
                    <TableCell>
                      ID
                    </TableCell>
                    <TableCell>
                      Title
                    </TableCell>
                    <TableCell align='center'>
                      Idea quantity
                    </TableCell>
                    <TableCell>
                      Closure Date
                    </TableCell>
                    <TableCell>
                      Final Closure Date
                    </TableCell>
                    <TableCell align='center'>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listTopic && listTopic.topics &&listTopic.topics
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(topic => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={topic.id}>
                        <TableCell>{topic.id}</TableCell>
                        <TableCell>{topic.name}</TableCell>
                      <TableCell align='center'>{topic.idea_quantity}</TableCell>
                        <TableCell>{topic.closureDate}</TableCell>
                        <TableCell>{topic.finalClosureDate}</TableCell> 
                        <TableCell align='center'>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button size ='small' className='icon-edit' >
                              Edit
                            </Button>
                            <IconButton size="small" aria-label="delete">
                              <DeleteIcon fontSize="small" className='icon-delete'/> 
                            </IconButton>
                          </Box>
                        </TableCell> 
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
          </TableContainer>
          {listTopic && listTopic.topics && (
            <TablePagination
            rowsPerPageOptions={[1,5,10]}
            component="div"
            count={listTopic.topics.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          )}
        </Paper>
    </div>
  )
}

export default TopicTable
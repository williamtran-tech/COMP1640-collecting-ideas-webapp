import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, IconButton, Grid, Typography, Dialog, Popover, DialogContent,DialogTitle, TextField } from '@material-ui/core';
import { Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useState, useEffect } from 'react';
import handleApi from '../../../service/handleApi';
import TopicInfo from './TopicInfo';
import TableIdeas from './TableIdeas';
import DeleteTopicModal from './DeleteTopicModal';
import DownloadIcon from '@mui/icons-material/Download';
import FileSaver from 'file-saver';
import moment from 'moment';

import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
const TopicTable = () => {
    const [listTopic, setListTopic]= useState()
    const [topicId, setTopicId]= useState()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [disable, setDisable]= useState(true)
    const [deleted, setDeleted]= useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [formTopic, setFormTopic] = useState({
      name: '',
      description: '',
      closureDate: '',
      finalClosureDate: '',
    });
    const [valueDate, onChange] = useState([new Date(), new Date()]);

    useEffect(() =>{
        setUpdated(false)
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
      },[submited, updated, deleted])
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
      console.log(valueDate)
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic here
      const data={
        name: formTopic.name,
        description: formTopic.description,
        "departmentId": 3,
        closureDate:moment(valueDate[0]).format('YYYY-MM-DD HH:mm:ss'),
        finalClosureDate: moment(valueDate[1]).format('YYYY-MM-DD HH:mm:ss'),
      }
      handleApi.admin_create_idea(data)
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
    const [activeRowId, setActiveRowId] = useState(null);
    const  [topicDeatail, setTopicDetail]= useState([])
    const handleRowClick = (id_row) => () => {     
      setActiveRowId(id_row);
      setTopicId(id_row)
      handleApi.admin_getIdeas_by_topic(id_row).then(
        response=>{
          setTopicDetail(response.data)
          console.log(response.data)
        }
      )
      if(disable===false){
        setDisable(true)
      }
    };
    const disableEditClick =()=>{
      setDisable(!disable)
      console.log(disable)
    }
    const [confirm, setConfirm]= useState(false)
    const confirmDelete= (id, quantity) =>{
      if(quantity>0){
        setConfirm(true)
      }else{
        handleApi.admin_force_delete_topic(id).then(response =>{
          console.log(response.data)
          setDeleted(!deleted)
        })
      }
    }
    
    const donwloadTopic = ()=>{
        handleApi.QA_dowload_topic(topicId).then(response=>{
          
          const blob = new Blob([response.data], { type: 'text/csv' });
          FileSaver.saveAs(blob, `Topic ${topicId}.csv`)
          console.log(response);
        }).catch(error=>{
          console.error("Failed to download topic CSV file.", error);
        })
    }
    const donwloadTopic_zip = ()=>{
        handleApi.QA_dowload_topic_zip(topicId).then(response=>{
          
          const blob = new Blob([response.data], { type: 'text/zip' });
          FileSaver.saveAs(blob, `Topic ${topicId}.zip`)
          console.log(response);
        }).catch(error=>{
          console.error("Failed to download topic CSV file.", error);
        })
    }
   
  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  }; 
  const handleClosePopover = () => {
      setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);
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
                    <Grid item xs={12} >
                    <Typography variant="h6" gutterBottom>
                      ClosureDate _FinalDate
                    </Typography>
                    <DateTimeRangePicker
                      onChange={onChange}
                      value={valueDate}
                      minDate={new Date()}
                      format="yyyy-MM-dd HH:mm"
                    />
                    </Grid>
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
                    {/* <Grid item xs={12} sm={6}>
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
                    </Grid> */}
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
          </Dialog>
       </Paper>
       <Paper sx={{ width: '100%', overflow: 'hidden' }} className="topics_table_list">
         <Grid container>
              <Grid item xs={6} >
                <TableContainer sx={{ maxHeight: '100vh'}} className='table_topic'>
                  <Table stickyHeader  size="small" aria-label="a dense table">
                    <TableHead >
                      <TableRow className='header_topic_list table-row' sx={{
                        "& th": {
                            color:"white",
                            backgroundColor: "hsla(212, 92%, 45%, 1)",
                            textTransform:'capitalize',
                        },
                        // fontSize: '0.8rem', // reduce font size
                        // padding: '0px', // remove padding
                        }}
                        >
                        {/* <TableCell>ID</TableCell> */}
                        <TableCell align='right'> Title</TableCell>
                        <TableCell align='center'>Idea quantity</TableCell>
                        <TableCell align='center'>Closure Date</TableCell>
                        <TableCell align='center'>Final Date</TableCell>
                        <TableCell align='center'>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listTopic && listTopic.topics &&listTopic.topics
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(topic => (
                          <TableRow hover role="checkbox" tabIndex={-1} key={topic.id} 
                          onClick={handleRowClick(topic.id)}
                          style={{
                            background: activeRowId === topic.id ? '#EEE' : 'transparent',
                            fontWeight: activeRowId === topic.id ? 'bold' : 'normal',
                          }}
                          className="table-row"
                         >
                            {/* <TableCell>{topic.id}</TableCell> */}
                            <TableCell align='right'>{topic.name}</TableCell>
                            <TableCell align='center'>{topic.idea_quantity}</TableCell>
                            <TableCell align='center'>{topic.closureDate}</TableCell>
                            <TableCell align='center'>{topic.finalClosureDate}</TableCell> 
                            <TableCell align='center'>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                
                                <Button size ='small' className='icon-edit' onClick={disableEditClick}>
                                  Edit
                                </Button>
                                <IconButton size="small" aria-label="delete" onClick={(event)=>{handleClickPopover(event)}}>
                                  <DownloadIcon fontSize="small" className='icon-download'/> 
                                </IconButton>
                                <IconButton size="small" aria-label="delete" onClick={()=>{confirmDelete(topic.id, topic.idea_quantity)}}>
                                  <DeleteIcon fontSize="small" className='icon-delete'/> 
                                </IconButton>
                                <DeleteTopicModal setConfirm={setConfirm} setDeleted={setDeleted} deleted = {deleted} idTopic={topic.id} confirm={confirm}></DeleteTopicModal>
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
              </Grid>
              <Grid item xs={6} className='topic_preview' >
                { topicDeatail && topicDeatail.info&& (
                   <TopicInfo inf={topicDeatail.info} isDisable={disable} setDisable={setDisable} setUpdated={setUpdated}></TopicInfo>
                )
                }
              </Grid>
              <Grid item xs={12} >
              { topicDeatail && topicDeatail.ideas&& (
                  <TableIdeas ideas={topicDeatail.ideas}  setUpdated={setUpdated} updated={updated}></TableIdeas>
                )
                }
          </Grid>
         </Grid>
         <Popover
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
            >
            <Stack direction={"row"} spacing={1}>
                <Button size='small' variant='out-line' style={{color:"#002B5B"}} onClick={donwloadTopic_zip}> Zip</Button>
                <Button size='small' variant='out-line' style={{color:"#57C5B6"}} onClick={donwloadTopic}> CSV</Button>
            </Stack>
        
        </Popover>
        </Paper>
    </div>
  )
}

export default TopicTable
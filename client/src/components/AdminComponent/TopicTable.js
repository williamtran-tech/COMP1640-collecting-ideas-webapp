
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import handleApi from '../../service/handleApi';
const TopicTable = () => {
    const [listTopic, setListTopic]= useState()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
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
      },[])
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

  return (

    <Paper sx={{ width: '100%', overflow: 'hidden' }} className="topics_table_list">
      <TableContainer sx={{ maxHeight: '100vh'}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow className='header_topic_list' sx={{
                "& th": {
                    color:"white",
                    backgroundColor: "hsla(212, 92%, 45%, 1)"
                }
                }}>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  Idea quantity
                </TableCell>
                <TableCell>
                  Closure Date
                </TableCell>
                <TableCell>
                  Final Closure Date
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
                   <TableCell>{topic.idea_quantity}</TableCell>
                    <TableCell>{topic.closureDate}</TableCell>
                    <TableCell>{topic.finalClosureDate}</TableCell> 
                  </TableRow>
                ))}
            </TableBody>
          </Table>
      </TableContainer>
      {listTopic && listTopic.topics && (
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={listTopic.topics.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  )
}

export default TopicTable
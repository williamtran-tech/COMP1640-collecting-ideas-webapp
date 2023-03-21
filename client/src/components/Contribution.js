import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Contribution = ({contribution}) => {
    console.log(contribution)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
  return (
    <div>
        <TableContainer sx={{ maxHeight: '100vh'}} className='table_idea_container'>
                  <Table stickyHeader  size="small" aria-label="a dense table" className='table_topic'>
                    <TableHead >
                      <TableRow className='react_list table-row' sx={{
                        "& th": {
                            color:"white",
                            backgroundColor: "",
                            textTransform:'capitalize',
                        },
                        }}
                        >
                        {/* <TableCell>ID</TableCell> */}
                        <TableCell>Idea Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Topic</TableCell>
                        <TableCell>Comment</TableCell>
                        <TableCell>Like</TableCell>
                        <TableCell>Dislike</TableCell>
                        <TableCell>Submit at</TableCell>
                         {/* <TableCell>Submit at</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contribution.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(contribution => (
                          <TableRow hover role="checkbox" tabIndex={-1}
                          className="table-row"
                         >
                            <TableCell>
                            <Link to={`/ideas/${contribution.ideaId}` } style={{ textDecoration: 'none' }}>
                            {contribution.idea}
                            </Link>
                            </TableCell>
                            <TableCell>{contribution.category}</TableCell>
                            <TableCell>
                            <Link to={`/topics/${contribution.topicId}`} style={{ textDecoration: 'none' }}>
                            {contribution.topic}
                            </Link>
                            </TableCell> 
                            <TableCell>{contribution.comments}</TableCell>
                            <TableCell>{contribution.likes}</TableCell>
                            <TableCell>{contribution.dislikes}</TableCell>
                            <TableCell>{contribution.updatedAt}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
              </TableContainer>
          
            <TablePagination
            rowsPerPageOptions={[1,5,10]}
            component="div"
            count={contribution.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
    </div>
  )
}

export default Contribution
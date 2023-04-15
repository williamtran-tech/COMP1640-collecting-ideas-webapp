import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const ReactHistory = ({react}) => {
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
                            backgroundColor: "hsla(212, 92%, 45%, 1)",
                            textTransform:'capitalize',
                        },
                        }}
                        >
                        {/* <TableCell>ID</TableCell> */}
                        <TableCell>Idea Name</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Topic</TableCell>
                         <TableCell>React at</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {react.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(react => (
                          <TableRow hover role="checkbox" tabIndex={-1}
                          className="table-row"
                         >
                          
                            <TableCell>
                            <Link to={`/ideas/${react.Idea.id}` } style={{ textDecoration: 'none' }}>
                            {react.Idea.name}
                            </Link>
                            </TableCell>
                            <TableCell>{react.Idea.User.fullName}</TableCell>
                            <TableCell>{react.Idea.Category.name}</TableCell>
                            <TableCell>
                            <Link to={`/topics/${react.Idea.Topic.id}`} style={{ textDecoration: 'none' }}>
                            {react.Idea.Topic.name}
                            </Link>
                            </TableCell> 
                            <TableCell>{react.createdAt}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
              </TableContainer>
          
            <TablePagination
            rowsPerPageOptions={[1,5,10]}
            component="div"
            count={react.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          
    </div>
  )
}

export default ReactHistory
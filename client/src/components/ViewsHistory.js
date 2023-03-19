import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ViewsHistory = ({view}) => {
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
                        <TableCell>User</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Topic</TableCell>
                         <TableCell>View at</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {view.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(view => (
                          <TableRow hover role="checkbox" tabIndex={-1}
                          className="table-row"
                         >
                            <TableCell>
                            <Link to={`/ideas/${view.Idea.id}` } style={{ textDecoration: 'none' }}>
                            {view.Idea.name}
                            </Link>
                            </TableCell>
                            <TableCell>{view.Idea.User.fullName}</TableCell>
                            <TableCell>{view.Idea.Category.name}</TableCell>
                            <TableCell>
                            <Link to={`/topics/${view.Idea.Topic.id}`} style={{ textDecoration: 'none' }}>
                            {view.Idea.Topic.name}
                            </Link>
                            </TableCell> 
                            <TableCell>{view.createdAt}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
              </TableContainer>
          
            <TablePagination
            rowsPerPageOptions={[1,5,10]}
            component="div"
            count={view.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
    </div>)
}

export default ViewsHistory
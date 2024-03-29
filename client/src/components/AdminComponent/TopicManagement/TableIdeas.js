import React, { useEffect } from 'react'
import { Box ,TableContainer, Table, TableCell, TableBody, Button,IconButton, TablePagination, TableHead, TableRow} from '@material-ui/core'
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useState } from 'react';
import { handle } from 'express/lib/router';
import DeleteIdeaModal from './DeleteIdeaModal';
const TableIdeas = ({ideas, setUpdated, updated, setOpenSnackBar}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [id, setId]=useState()
    const [idea, setIdea] = useState([]);
    useEffect(()=>(
      setIdea(ideas)
    ),[ideas])
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
      const [activeRowId, setActiveRowId] = useState(null);
      const handleRowClick = (id_row) => () => {     
        setActiveRowId(id_row);
      };
      const handleOpenModal =(idDelete) =>{
        setId(idDelete)
        setOpenDeleteModal(true)
      }
  return (
    <>
    <TableContainer sx={{ maxHeight: '100vh'}} className='table_idea_container'>
                  <Table stickyHeader  size="small" aria-label="a dense table" className='table_topic'>
                    <TableHead >
                      <TableRow className='ideas_list table-row' sx={{
                        "& th": {
                            color:"white",
                            backgroundColor: "hsla(212, 92%, 45%, 1)",
                            textTransform:"uppercase",
                        },
                        // fontSize: '0.8rem', // reduce font size
                        // padding: '0px', // remove padding
                        }}
                        >
                        {/* <TableCell>ID</TableCell> */}
                        <TableCell>Idea</TableCell>
                        <TableCell>Owner Name</TableCell>
                        <TableCell align='center'>Likes</TableCell>
                        <TableCell align='center'>Dislikes</TableCell>
                        <TableCell align='center'>Views</TableCell>
                        <TableCell align='center'>Comments</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell align='center'>Created At</TableCell>
                        <TableCell align='center'>Updated At</TableCell>
                        <TableCell align='center'>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {idea && idea.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(idea => (
                          <TableRow hover role="checkbox" tabIndex={-1} key={idea.ideaId} 
                          onClick={handleRowClick(idea.id)}
                          style={{
                            background: activeRowId === idea.id ? '#EEE' : 'transparent',
                            fontWeight: activeRowId === idea.id ? 'bold' : 'normal',
                          }}
                          className="table-row"
                         >
                            <TableCell>{idea.idea}</TableCell>
                            <TableCell>{idea.ownerName}</TableCell>
                            <TableCell align='center'>{idea.likes}</TableCell>
                            <TableCell align='center'>{idea.dislikes}</TableCell>
                            <TableCell align='center'>{idea.views}</TableCell>
                            <TableCell align='center'>{idea.comments}</TableCell>
                            <TableCell>{idea.category}</TableCell>
                            <TableCell align='center'>{idea.createdAt}</TableCell>
                            <TableCell align='center'>{idea.updatedAt}</TableCell>
                            <TableCell align='center'>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton size="small" aria-label="delete" onClick={()=>{handleOpenModal(idea.ideaId)}}>
                                  <DeleteIcon fontSize="small" className='icon-delete'/> 
                                </IconButton>
                              </Box>
                            </TableCell> 
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
              </TableContainer>
          
            <TablePagination
            rowsPerPageOptions={[1,5,10]}
            component="div"
            count={ideas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <DeleteIdeaModal setOpenDeleteModal={setOpenDeleteModal} openDeleteModal={openDeleteModal} id={id} setUpdated={setUpdated} updated={updated}  idea={idea} setIdea={setIdea} setOpenSnackBar={setOpenSnackBar}></DeleteIdeaModal>
    </>
  )
}

export default TableIdeas
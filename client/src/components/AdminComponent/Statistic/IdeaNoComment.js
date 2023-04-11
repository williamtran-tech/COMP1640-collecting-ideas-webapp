import React from 'react'
import { Grid } from '@material-ui/core'
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Avatar  } from '@mui/material'

const IdeaNoComment = ({ideaWithoutComment}) => {
  return (
    <Grid xs={12}>
            <Typography className='title_chart' variant="body1">
                Idea Without Comment
            </Typography>
            {/* <Bar data={data} options={options}></Bar>
             */}
            <Box>
            <TableContainer component={Paper}>
                <Table stickyHeader  size="small" aria-label="a dense table" className='table_topic'>
                  <TableHead>
                    <TableRow> 
                      <TableCell>Idea</TableCell>
                      <TableCell>Owner</TableCell>
                      <TableCell>Topic</TableCell>
                      <TableCell>Category</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ideaWithoutComment.map((idea) => (
                      <TableRow key={idea.id}>
                        <TableCell>{idea.name}</TableCell>
                        <TableCell >
                            <div className='user_infor'>
                                <Avatar src={idea.User.profileImage} />
                                  <div>
                                      <div className='user_name'>{idea.User.fullName}</div>
                                      <div className='user_email'>{idea.User.email}</div>
                                  </div>
                            </div>
                        </TableCell>
                        <TableCell>{idea.Topic.name}</TableCell>
                        <TableCell>{idea.Category.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
        </Grid>
  )
}

export default IdeaNoComment
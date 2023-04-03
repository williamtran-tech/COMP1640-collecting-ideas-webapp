import React from 'react'
import 'chart.js/auto'
import {Bar} from 'react-chartjs-2'
import { Grid } from '@material-ui/core'
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Avatar  } from '@mui/material'
import { useState } from 'react'
const IdeaRanking = ({ranking}) => {
    console.log(ranking)

    const data={
        labels: ranking.map(idea=> idea.ideaId),
        datasets:[
            {
                label: 'Top 10 Favorite Idea',
                data: ranking.map(idea => idea.likes),
                borderColor: 'rgba(255, 206, 86, 0.5)',
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
            }
        ]
    }
    const options = {
        indexAxis: 'y',
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: false,
        },
        plugins:{
            legend: {
            display: true,
            position: 'bottom',
            align: 'center',
            labels: {
              usePointStyle: true,
              boxWidth: 10,
              display:'flex',
              font: {
                size: 10
              },
              padding: 20
            }
          }
        }
        
      };
  return (
    <div>
        <Grid xs={12}>
            <Typography className='title_chart' variant="body1">
                Top 10 Favortie Ideas
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
                      <TableCell>Department Name</TableCell>
                      <TableCell>Likes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ranking.map((idea) => (
                      <TableRow key={idea.id}>
                        <TableCell>{idea.idea}</TableCell>
                        <TableCell >
                            <div className='user_infor'>
                                <Avatar src={idea.profileImage} />
                                  <div>
                                      <div className='user_name'>{idea.fullName}</div>
                                      <div className='user_email'>{idea.email}</div>
                                  </div>
                            </div>
                        </TableCell>
                        <TableCell>{idea.departmentName}</TableCell>
                        <TableCell>{idea.likes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
        </Grid>
    </div>
  )
}

export default IdeaRanking
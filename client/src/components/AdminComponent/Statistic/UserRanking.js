import React from 'react'
import 'chart.js/auto'
import {Bar} from 'react-chartjs-2'
import { Grid } from '@material-ui/core'
import { Typography } from '@mui/material'

const UserRanking = ({ranking}) => {
    const data = {
        labels: ranking.map(user => user.fullName),
        datasets: [
          {
            label: 'Top 10 contributor',
            data: ranking.map(user => user.contributions),
            borderColor: '#d90429',
            backgroundColor: '#d90429',
            
          },
        ],
      };
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
            position: 'right',
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
        <Grid xs={5}>
            <Typography className='title_chart' variant="body1">
                Top 10 Contributors
            </Typography>
            <Bar data={data} options={options}></Bar>
        </Grid>
    </div>
  )
}

export default UserRanking
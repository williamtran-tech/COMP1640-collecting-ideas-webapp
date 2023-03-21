import React from 'react'
import 'chart.js/auto'
import {Bar} from 'react-chartjs-2'
import { Grid } from '@material-ui/core'
import { Typography } from '@mui/material'
const TopicIdea = ({topics_idea}) => {
    console.log(topics_idea)
    const data={
        labels: topics_idea.map(topic=> topic.name),
        datasets:[
            {
                label: 'Top 10 Favorite Idea',
                data: topics_idea.map(topic => topic.idea_quantity),
                borderColor: '#d90429',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }
        ]
    }
    const options = {
        indexAxis: 'x',
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
                Ideas From Topic
            </Typography>
            <Bar data={data} options={options}></Bar>
        </Grid>
    </div>
  )
}

export default TopicIdea
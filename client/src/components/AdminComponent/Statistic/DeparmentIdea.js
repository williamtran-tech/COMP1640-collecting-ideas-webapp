import React from 'react'
// import { Chart as ChartJS, ArcElement, Tooltip,Title, Legend } from 'chart.js';
import 'chart.js/auto'

import { Pie, Line } from 'react-chartjs-2';
import { Grid } from '@mui/material';
import { Typography } from '@material-ui/core';
// ChartJS.register(ArcElement, Tooltip,Title, Legend);
const DeparmentIdea = ({department_ideas}) => {
    console.log(department_ideas)
    const data = {
        labels: department_ideas.map(department => department.name),
        datasets: [
          {
            data: department_ideas.map(department => department.idea_quantity),
            backgroundColor: [
              '#FF6384',
              '#fad643',
              '#52b788'
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#edc531',
              '#40916c'
            ]
          }
        ],
        options : {
            plugins: {
              title: {
                display: true,
                text: 'Department Ideas',
                position: 'bottom'
              },
              legend: {
                display: true,
                position: "right",
              },
            },           
          },

      };
      const data2 = {
        labels: department_ideas.map(department => department.name),
        datasets: [
          {
            label: 'Number of Ideas',
            data: department_ideas.map(department => department.idea_quantity),
            fill: false,
            borderColor: '#00509d',
            tension: 0.1,
            pointStyle: 'circle',
            pointRadius: 5,
          }
        ]
      };
      const options1 = {
        plugins: {
          title: {
            display: false ,
            text: 'Department Ideas',
            font: {
              size: 18,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 10
            },
            position: 'bottom'
          },
          legend: {
            display: true,
            position: 'right',
            align: 'center',
            labels: {
              usePointStyle: true,
              boxWidth: 10,
              font: {
                size: 10
              },
              padding: 20
            }
          }
        },

        
      };
      const options2 = {
        plugins: {
          title: {
            display: false,
            text: 'Department Ideas',
            position: 'bottom'
          },
          legend: {
            display: true,
            position: "top",
            labels: {
                usePointStyle: true,
                boxWidth: 10,
                font: {
                  size: 10
                },
                padding: 20
              }
          },
        },           
      }
  return (
    <div className='department_ideas_chart'>
        <Grid container>
            <Grid item xs={12}>
                <Typography className='title_chart' variant="body1" >Idea from department</Typography>
            </Grid>
            <Grid item xs={4}>
                <Pie data={data} options={options1}/>
            </Grid>
            <Grid item xs={8}>
                <Line data={data2} options={options2}></Line>
            </Grid>
        </Grid>
        
    </div>
  )
}

export default DeparmentIdea
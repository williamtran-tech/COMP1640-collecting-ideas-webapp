import React from 'react'
// import { Chart as ChartJS, ArcElement, Tooltip,Title, Legend } from 'chart.js';
import 'chart.js/auto'

import { Pie, Bar } from 'react-chartjs-2';
import { Grid } from '@mui/material';
import { Typography } from '@material-ui/core';
// ChartJS.register(ArcElement, Tooltip,Title, Legend);
const DeparmentIdea = ({department_ideas, department_contributors}) => {
    console.log(department_ideas)
    const labels = department_ideas.map(department => department.name)
    const Colors = labels.map(() => {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      return `rgb(${red}, ${green}, ${blue})`;
    });
    const data = {
        labels: labels,
        datasets: [
          {
            data: department_ideas.map(department => department.idea_quantity),
            backgroundColor: Colors,
            hoverBackgroundColor: Colors
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
            backgroundColor: '#00509d',
          },
          {
            label: 'Number of Contributor',
            data: department_contributors.map(department => department.contributors),
            fill: false,
            borderColor: '#a2d6f9',
            backgroundColor: '#a2d6f9',
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
                <Typography className='title_chart' variant="body1" >Ideas from departments</Typography>
            </Grid>
            <Grid item xs={4}>
                <Pie data={data} options={options1}/>
            </Grid>
            <Grid item xs={8}>
                <Bar data={data2} options={options2}></Bar>
            </Grid>
        </Grid>
        
    </div>
  )
}

export default DeparmentIdea
import React from 'react'
// import { Chart as ChartJS, ArcElement, Tooltip,Title, Legend } from 'chart.js';
import 'chart.js/auto'

import { Pie, Line } from 'react-chartjs-2';
import { Grid } from '@mui/material';
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
              '#36A2EB',
              '#FFCE56'
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
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
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      };
      const options1 = {
        plugins: {
          title: {
            display: false,
            text: 'Department Ideas',
            position: 'bottom'
          },
          legend: {
            display: true,
            position: "right",
          },
        },           
      }
      const options2 = {
        plugins: {
          title: {
            display: true,
            text: 'Department Ideas',
            position: 'bottom'
          },
          legend: {
            display: true,
            position: "top",
          },
        },           
      }
  return (
    <div className='department_ideas_chart'>
        <Grid xs={4}>
             <Pie data={data} options={options1}/>
        </Grid>
        <Grid xs={8}>
             <Line data={data2} options={options2}></Line>
        </Grid>
    </div>
  )
}

export default DeparmentIdea
import React from 'react'
import 'chart.js/auto'
import {PolarArea} from 'react-chartjs-2'
import { Grid } from '@material-ui/core'
import { Typography } from '@mui/material'
const CategoryIdea = ({categories_idea}) => {
    const data = {
        labels: categories_idea.map(category=> category.name),
        datasets: [
          {
            label: '# of Votes',
            data: categories_idea.map(category=> category.idea_quantity),
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
            //   'rgba(75, 192, 192, 0.5)',
            //   'rgba(153, 102, 255, 0.5)',
            //   'rgba(255, 159, 64, 0.5)',
            ],
            borderWidth: 1,
          },
        ],
      };
  return (
    <div>
        <Grid xs={12}>
            <Typography className='title_chart' variant="body1">
                Ideas From Each Categorys
            </Typography>
            <PolarArea data={data} ></PolarArea>
        </Grid>
    </div>
  )
}

export default CategoryIdea
import { Paper, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import handleApi from '../../../service/handleApi'
import DeparmentIdea from './DeparmentIdea'
import '../../../style/statistic.css'
const StatisticLayout = () => {
    const [data, setData]= useState([])
    useEffect(()=>{
        handleApi.QA_get_statistic().then(response=>{
            console.log(response.data)
            setData(response.data)
        }).catch(e => {
            console.log(e);
          });
    },[])
  return (
    <div>
            <Grid container>
                <Grid item xs={12} className="chart_item">
                    <Paper>
                        {
                        data && data.department_ideas&&(
                            <DeparmentIdea department_ideas={data.department_ideas}></DeparmentIdea>
                        )
                    }
                    </Paper>
                    
                </Grid>
                {/* <Grid item xs={8} className="chart_item">
                    <Paper>
                        {
                        data && data.department_ideas&&(
                            <DeparmentIdea department_ideas={data.department_ideas}></DeparmentIdea>
                        )
                    }
                    </Paper>
                    
                </Grid> */}
            </Grid>
        
    </div>
  )
}

export default StatisticLayout
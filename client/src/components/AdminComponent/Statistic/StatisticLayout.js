import { Paper, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import handleApi from '../../../service/handleApi'
import DeparmentIdea from './DeparmentIdea'
import '../../../style/statistic.css'
import UserRanking from './UserRanking'
import IdeaRanking from './IdeaRanking'
import CategoryIdea from './CategoryIdea'
import TopicIdea from './TopicIdea'
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
                <Grid item xs={12} >
                    <Paper className="chart_item">
                        {
                        data && data.department_ideas&&(
                            <DeparmentIdea department_ideas={data.department_ideas} department_contributors={data.department_contributors}></DeparmentIdea>
                        )
                    }
                    </Paper>
                    
                </Grid>
                <Grid item xs={6} className="chart_container1">
                    <Paper className="chart_item">
                        {
                        data && data.top_contributors&&(
                            <UserRanking ranking={data.top_contributors}></UserRanking>
                        )
                    }
                    </Paper>
                </Grid>
                <Grid item xs={6} className="chart_container2">
                    <Paper className="chart_item">
                        {
                        data && data.top_like_ideas&&(
                           <IdeaRanking ranking={data.top_like_ideas}></IdeaRanking>
                        )
                    }
                    </Paper>
                </Grid>
                <Grid item xs={7} className="chart_container1">
                    <Paper className="chart_item">
                        {
                        data && data.topics&&(
                            <TopicIdea topics_idea={data.topics}></TopicIdea>
                        )
                    }
                    </Paper>
                </Grid>
                <Grid item xs={5} className="chart_container2">
                    <Paper className="chart_item">
                        {
                        data && data.categories&&(
                           <CategoryIdea categories_idea={data.categories}></CategoryIdea>
                        )
                    }
                    </Paper>
                </Grid>
            </Grid>
        
    </div>
  )
}

export default StatisticLayout
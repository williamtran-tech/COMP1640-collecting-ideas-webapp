import React from 'react'
import { Box, Grid } from "@material-ui/core"
import { Outlet, Route, Routes } from "react-router-dom"
import AdminNavbar from './AdminNavbar'
import { Link} from 'react-router-dom'
const Layout = ({userRole}) => {
  return (
    <Box className="dashboard_window">
      <Grid container>
          <Grid item className="dashboard_navigation_container" xs={4} md={3} lg={2}>
            <AdminNavbar userRole={userRole}></AdminNavbar>
          </Grid>
          <Grid item className="dashboard_content" xs={8} md={9} lg={10}>
            <Outlet></Outlet>
          </Grid>
      </Grid>
    </Box>
  )
}

export default Layout
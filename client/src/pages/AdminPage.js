import { Box, Grid } from "@material-ui/core"
import { Route, Routes } from "react-router-dom"
import AdminNavbar from "../components/AdminComponent/AdminNavbar"
import CreateNewTopic from "../components/AdminComponent/CreateNewTopic"

import Layout from "../components/AdminComponent/Layout"
import { TopicManagement } from "../components/AdminComponent/TopicManagement"
import '../style/admin.css' 
const AdminPage = ({isLoggedIn, setIsLoggedIn }) => {
  return(
    <>  
    <Routes>
        <Route  path="/" element={<Layout></Layout>}>
          <Route path="/"element={<TopicManagement></TopicManagement>} />
          <Route path="/create" element={<CreateNewTopic></CreateNewTopic>} />
        </Route>
      </Routes>
    </>
  )
}

export default AdminPage
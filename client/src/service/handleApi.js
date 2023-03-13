import axios from 'axios'
import config from './headerToken';
import config_form from './header_form';

const getListTopic = async () => {
    return await axios.get("/topics",config());
  };
const getIdeas_by_topic= async id => {
    return await axios.get(`/topics/${id}`, config());
}
// const getIdeas_by_topic= async() => {
//     return await axios.get(`/topics/2`, config());
// }
const getIdeaDetail_by_idea = async id => {
        return await axios.get(`/ideas/${id}`, config());
}
const post_comment = data => {
    return axios.post("/comments", data, config());
  };
const react = async (id, data) => {
  return await axios.put(`/ideas/${id}`,data, config());
};
const login = data => {
    return axios.post("/accounts/login", data)
};
const create_idea= async (id, data) =>{
    return axios.post(`/topics/${id}/upload`, data, config_form());
};
const admin_getListTopic = async () => {
    return await axios.get("/admin/topics",config());
  };
 const admin_create_idea= async (data) =>{
    return axios.post(`/admin/topics`, data, config());
};
const admin_getIdeas_by_topic= async id => {
  return await axios.get(`/admin/topics/${id}`, config());
}
const admin_update_topic= async (id,data) => {
  return await axios.put(`/admin/topics/${id}`,data, config());
}
const handleApi = {
    getListTopic,
    getIdeas_by_topic,
    getIdeaDetail_by_idea,
    post_comment, 
    react,
    login, 
    create_idea,
    admin_getListTopic,
    admin_create_idea,
    admin_getIdeas_by_topic,
    admin_update_topic
};
export default handleApi
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
const get_user_inf= async (id) =>{
  return axios.get(`/users/profile/${id}`, config());
};
const update_avatar= async (id, data) =>{
  return axios.put(`/users/update-avatar/${id}`,data, config_form());
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
const admin_delete_topic= async(id)=>{
  return await axios.delete(`/admin/topics/${id}`, config());
}
const admin_force_delete_topic= async(id)=>{
  return await axios.delete(`/admin/topics/force-delete/${id}`, config());
}
const admin_get_uset_inf = async()=>{
  return await axios.get(`/admin/users`, config());
}
const admin_create_user = async(data)=>{
  return await axios.post(`/admin/users`, data, config());
}
const admin_delete_user = async(id)=>{
  return await axios.delete(`/admin/users/${id}`, config());
}
const admin_update_user = async(id, data)=>{
  return await axios.put(`/admin/users/${id}`,data, config_form());
}
const handleApi = {
    getListTopic,
    getIdeas_by_topic,
    getIdeaDetail_by_idea,
    post_comment, 
    react,
    login, 
    create_idea,
    get_user_inf,
    admin_getListTopic,
    admin_create_idea,
    admin_getIdeas_by_topic,
    admin_update_topic,
    admin_delete_topic,
    admin_force_delete_topic,
    admin_get_uset_inf,
    admin_create_user,
    admin_delete_user,
    admin_update_user,
    update_avatar
};
export default handleApi
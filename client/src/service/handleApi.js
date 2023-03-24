import axios from 'axios'
import config from './headerToken';
import config_download from './header_download';
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
    return await axios.get("/management/topics",config());
  };
const admin_create_idea= async (data) =>{
    return axios.post(`/management/topics`, data, config());
};

const admin_getIdeas_by_topic= async id => {
  return await axios.get(`/management/topics/${id}`, config());
}
const admin_update_topic= async (id,data) => {
  return await axios.put(`/management/topics/${id}`,data, config());
}
const admin_delete_topic= async(id)=>{
  return await axios.delete(`/management/topics/${id}`, config());
}
const admin_force_delete_topic= async(id)=>{
  return await axios.delete(`/management/topics/force-delete/${id}`, config());
}
const admin_force_delete_ideas= async(id)=>{
  return await axios.delete(`management/ideas/${id}`, config());
}
const admin_get_uset_inf = async()=>{
  return await axios.get(`/management/users`, config());
}
const admin_create_user = async(data)=>{
  return await axios.post(`/management/users`, data, config());
}
const admin_delete_user = async(id)=>{
  return await axios.delete(`/management/users/force-delete/${id}`, config());
}
const admin_update_user = async(id, data)=>{
  return await axios.put(`/management/users/${id}`,data, config_form());
}
const QA_get_statistic = async()=>{
  return await axios.get(`/management/statistic`, config());
}

const QA_dowload_topic = async(id)=>{
  return await axios.get(`/management/csv-topic/download/${id}`, {responseType: 'blob', ...config_download()});
}
const verifyEmail = async (token) =>{
  return await axios.get(`/accounts/verify?token=${token}`)
}
const get_resetEmail = async (token) =>{
  return await axios.get(`/accounts/reset-password?token=${token}`)
}
const post_resetEmail = async (token, data) =>{
  return await axios.post(`/accounts/reset-password?token=${token}`, data)
}
const forgotPassword = async (email)=>{
  return await axios.post('/accounts/forgot-password', email)
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
    admin_force_delete_ideas,
    admin_get_uset_inf,
    admin_create_user,
    admin_delete_user,
    admin_update_user,
    update_avatar,
    QA_get_statistic,
    QA_dowload_topic,
    verifyEmail,
    forgotPassword,
    get_resetEmail,
    post_resetEmail
};
export default handleApi
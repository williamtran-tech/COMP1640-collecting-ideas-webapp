import axios from 'axios'
import config from './headerToken';

const getListTopic = async () => {
    return await axios.get("/topics");
  };
// const getIdeas_by_topic= async id => {
//     return await axios.get(`/topics/${id}`);
// }
const getIdeas_by_topic= async() => {
    return await axios.get(`/topics/2?page=1`);
}
const getIdeaDetail_by_idea = async id => {
    if(config){
        return await axios.get(`/ideas/${id}`, config);
    }
}
const post_comment = data => {
    return axios.post("/comments", data, config);
  };
const login = data => {
    return axios.post("/accounts/login", data)
};
const handleApi = {
    getListTopic,
    getIdeas_by_topic,
    getIdeaDetail_by_idea,
    post_comment, 
    login
};
export default handleApi
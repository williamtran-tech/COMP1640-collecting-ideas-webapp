import axios from 'axios'

const getListTopic = async () => {
    return await axios.get("/topics");
  };
const getIdeas_by_topic= async id => {
    return await axios.get(`/topics/${id}`);
}
const getIdeaDetail_by_idea = async id => {
    return await axios.get(`/ideas/${id}`);
}
const post_comment = data => {
    return axios.post("/comments", data);
  };
const handleApi = {
    getListTopic,
    getIdeas_by_topic,
    getIdeaDetail_by_idea,
    post_comment 
};
export default handleApi
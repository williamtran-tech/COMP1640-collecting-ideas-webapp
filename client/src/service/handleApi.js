import axios from 'axios'

const getListTopic = async () => {
    return await axios.get("/topics");
  };
const getIdeas_by_topic= async id => {
    return await axios.get(`/topics/${id}`);
}

const handleApi = {
    getListTopic,
    getIdeas_by_topic 
};
export default handleApi
import axios from 'axios'

const getListTopic = async () => {
    return await axios.get("/topics");
  };


const handleApi = {
    getListTopic    
};
export default handleApi
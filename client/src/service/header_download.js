const config_download = ()=>{
    const token = JSON.parse(localStorage.getItem('token'));
    const headers = {
    Authorization: `Bearer ${token}`
  };
  return { headers };
  
  };export default config_download
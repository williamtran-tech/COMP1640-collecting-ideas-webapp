const config_form = ()=>{
    const token = JSON.parse(localStorage.getItem('token'));
    const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`
  };
  return { headers };
  
  };export default config_form
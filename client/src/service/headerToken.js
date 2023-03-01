const config = ()=>{
    const token = JSON.parse(localStorage.getItem('token'));
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
  return { headers };

};export default config
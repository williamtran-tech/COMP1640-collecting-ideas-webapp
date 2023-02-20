const config = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + JSON.parse(localStorage.getItem('token'))
    }
};export default config
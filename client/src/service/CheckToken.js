import jwt_decode from 'jwt-decode';
const checkToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
  
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    if (decodedToken.exp < currentTime) {
      alert("Your token is expired");
      localStorage.removeItem('token');
      return null;
    }
  
    return decodedToken;
}

export default checkToken
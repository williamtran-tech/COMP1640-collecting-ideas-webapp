
import { Navigate, useNavigate } from "react-router-dom";
const CheckToken = () => {
const token = JSON.parse(localStorage.getItem("token"));
    const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
          return null;
        }
      };
      if (token) {
            const decodedJwt = parseJwt(token);
        if (decodedJwt.exp * 1000 > Date.now()) {
          localStorage.removeItem("token")
          return true
        }
      }
        return false
}

export default CheckToken
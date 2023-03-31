import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import handleApi from '../service/handleApi';
const VerifyAccount = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);
    const [status, setStatus] = useState();
    useEffect(()=>{
        handleApi.verifyEmail(token).then(response=>{
            console.log(response.data)
            setStatus(response.data.msg)
        }).catch(error=>{
          console.log(error.response.data)
          setStatus(error.response.data.err)
        })
    }, [])
    useEffect(() => {
      const timerId = setInterval(() => {
        setCountdown(countdown => countdown - 1);
      }, 1000);
      if (countdown === 0) {
         navigate('/login');
        }
      return () => {
        clearInterval(timerId);
      };
        
      }, [countdown]);

  return (
    <div className="container_notfound container_auth" >
    <div>
        <div className='notfound'>{status}</div>
        <div>
             <p>Redirecting to login page in {countdown} seconds..</p>
        </div>
    </div>
    </div>
  )
}
export default VerifyAccount
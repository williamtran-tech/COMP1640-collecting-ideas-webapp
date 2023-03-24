import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import handleApi from '../service/handleApi';
const VerifyAccount = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);
    useEffect(()=>{
        handleApi.verifyEmail(token).then(response=>{
            console.log(response.data)
        })
        const timerId = setInterval(() => {
            setCountdown(countdown => countdown - 1);
          }, 1000);
      
          return () => {
            clearInterval(timerId);
          };
    })
    useEffect(() => {
        if (countdown === 0) {
         navigate('/login');
        }
      }, [countdown]);

  return (
    <div className="container_notfound">
    <div>
        <div className='notfound'> VerifyAccount Successfully</div>
        <div>
             <p>Redirecting to login page in {countdown} seconds..</p>
        </div>
    </div>
</div>
  )
}

export default VerifyAccount
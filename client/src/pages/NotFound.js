import React from 'react'
import '../style/navbar.css'
const NotFound = () => {
  return (
    <div className="container_notfound container_auth">
        <div>
            <div className='notfound'> Oops! 404 Not Found</div>
            <div>
                 <p>Sorry, the page you are looking for does not exist.</p>
                 <a href="/" className='linkto'>Go to Home Page</a>
            </div>
        </div>
    </div>
  )
}
export default NotFound
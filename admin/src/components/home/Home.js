import { Link } from 'react-router-dom'
import './App.css'
const Home=()=>{
    return(
       <>
        <div className="showcase">
             <h2>Welcome to Railway Admin Page</h2>
             <p>Rail-Way attempts to provide an interface for rail travelers to view an active schedule and provide a trip planner.</p>
            
            <hr/>
            <hr/>
            <Link style={{ textDecoration: 'none' }} className="showcase-login" to="/login">Details</Link>
            
         </div>
        
        <p className="copy">&copy;2021 Railway</p>
       </>
          
    )
}
export default Home;
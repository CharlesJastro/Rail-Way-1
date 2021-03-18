import {Link} from 'react-router-dom';
import {Image} from 'react-bootstrap';
import './App.css'
const Home=(param)=>{
    console.log(param);
    return(
        <>
            <div className="showcase">
                <h2>Welcome to Railway Admin Page</h2>
                <p>This portal allows administrators the ability to modify the database.</p>
            {!param.isLoggedIn ? <><p>Only authorized personnel may access this page</p><Link style={{ textDecoration: 'none' }} to="/login">Please Login</Link></> : <p>Welcome, Administrator</p>}
            <Image src="./Train2.png" fluid style={{padding: '0 13%'}}/>
            </div>
            <p className="copy">&copy;2021 Railway</p>
        </>  
    )
}
export default Home;
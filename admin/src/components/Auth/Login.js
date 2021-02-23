import axios from 'axios';
import React,{useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
//import './App.css';
function Login(){
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const {getLoggedIn}=useContext(AuthContext);
    const history=useHistory();
    async function login(e){
        e.preventDefault()
        try{
            const loginData={
                email, password
            };

        await axios.post('/auth/login', loginData);
        await getLoggedIn();
        history.push('/')

        }catch(err){
            console.error(err)

        }
    }
    return(
        
        <div className="container" style={{
            minWidth: '20%',
            maxWidth: 400,
            minHeight: '10%',
            maxHeight: 120,
          }}>
            <h2>Railway Admin Login</h2>
            
            <form onSubmit={login}>
            <div className="imgcontainer">
                <img
                className="avatar"
                alt="avatar"
                src="https://dlgdxii3fgupk.cloudfront.net/static/images/comprofiler/gallery/operator/operator_m.png"
                />
            </div>
                <div className="logincontainer">
                <label><b>Username</b></label>
                <input type="email" 
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                
                />
                
                <label><b>Password</b></label>
                <input type="password" 
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                />
                <button className="btnAdmin" type="submit">Login</button>
                </div>
            </form>
        </div>
        
    )
}
export default Login;
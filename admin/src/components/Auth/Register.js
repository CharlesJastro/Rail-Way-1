import axios from 'axios';
import React,{useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

function Register(){
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const {getLoggedIn} = useContext(AuthContext);
    const history=useHistory();
    async function register(e){
        e.preventDefault()
        try{
            const registerData={
                email, password
            };

        await axios.post('/auth', registerData)
            await getLoggedIn();
            history.push('/')
        }catch(err){
            console.error(err)

        }
    }
    return(
        <div>
            <h2>Register</h2>
            <form onSubmit={register}>
                <input type="email" 
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                />
                <input type="password" 
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}
export default Register;
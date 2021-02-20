import axios from 'axios';
import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

function LogOutBtn(){
    const{getLoggedIn}=useContext(AuthContext);

    const history= useHistory();
   async function logOut(){
       await axios.get('/auth/logout')
      await getLoggedIn();
      history.push('/')

    }
    return(
        <button className="btn btn-outline-success my-2 my-sm-0" onClick={logOut}>Log Out</button>
    )
}
export default LogOutBtn;
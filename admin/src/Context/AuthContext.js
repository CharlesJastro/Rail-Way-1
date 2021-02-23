import axios from 'axios';
import React,{createContext,useState, useEffect} from 'react';
const AuthContext= createContext();
function AuthContextProvider(props){
const [loggedIn, setLoggedIn]=useState(undefined);

async function getLoggedIn(){
    const loggedInRes = await axios('/auth/loggedIn');
    setLoggedIn(loggedInRes.data)
}
useEffect(()=>{
    getLoggedIn()
},[])
    return <AuthContext.Provider value={{loggedIn, getLoggedIn}}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext;
export {AuthContextProvider}
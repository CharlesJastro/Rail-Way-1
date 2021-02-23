import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './App.css'
import{Nav,
    NavLink,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    NavItem
} from 'reactstrap'
import {useContext} from 'react';
import AuthContext from '../../Context/AuthContext';
import LogOutBtn from '../Auth/LogOutBtn';
import trainImg from '../layout/classic_locomotive_train_312396.png'
 function NavBar(props){
     
    
    const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
     const {loggedIn}=useContext(AuthContext);

    return(
        <div>
            
         
            <Navbar collapseonselect color="dark" expand="sm" className="mb" sticky="top" variant="dark">
                <NavbarBrand className="mr-auto text-white"  href="/">
                    <img alt=""
                 src={trainImg}
                 width="60"
                 height="30"
                 className="d-inline-block align-top" />{' '}
                Rail-Way
                </NavbarBrand>
                
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav className="ml-auto" navbar>
            <NavItem>
        {loggedIn ===false && (
                <>
                {/* <NavLink to="/register">Register</NavLink> */}
                <NavLink className="text-white" href="/login">Admin Login</NavLink>
                </>
            )
        }
        </NavItem>
        
        {
            loggedIn ===true && (
                <>
        <NavLink className="text-white" href="/exceptions">Exceptions</NavLink>
         <NavLink className="text-white" href="/routes">Routes</NavLink>
         <NavLink className="text-white" href="/notifications">Notifications</NavLink>
         <NavLink className="text-white" href="/stations">Stations</NavLink>
         
         
         <LogOutBtn className="text-white" />
         
         
                </>
            )
        }
        
       
        </Nav>
         </Collapse>
         
         </Navbar>
         
        </div>


        
    )
}
export default NavBar;


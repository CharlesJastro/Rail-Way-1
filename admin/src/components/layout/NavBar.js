import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './App.css'
import{
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap'
import {useContext} from 'react';
import AuthContext from '../../Context/AuthContext';
import LogOutBtn from '../Auth/LogOutBtn';
import trainImg from '../layout/classic_locomotive_train_312396.png'
 function NavBar(props){
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const {loggedIn}=useContext(AuthContext);

    return(
            <Navbar color="dark" dark expand="sm" sticky="top">
                <NavbarBrand className="mr-auto text-white"  href="/">
                    <img alt=""
                        src={trainImg}
                        width="60"
                        height="30"
                        className="d-inline-block align-top" />{' '}
                        Rail-Way
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {loggedIn ===false && (
                            <NavItem>
                                <NavLink className="text-white" href="/login">Admin Login</NavLink>
                            </NavItem>
                        )}
                        {loggedIn ===true && (
                            <>
                            <NavItem>
                                <NavLink className="text-white" href="/exceptions">Exceptions</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-white" href="/routes">Routes</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-white" href="/notifications">Notifications</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-white" href="/stations">Stations</NavLink>
                            </NavItem>
                            <NavItem>   
                                <LogOutBtn className="text-white" />
                            </NavItem>
                            </>
                            )
                        }
                    </Nav>
                </Collapse>
         </Navbar>


        
    )
}
export default NavBar;


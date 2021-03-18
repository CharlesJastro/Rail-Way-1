import React, { useState } from 'react';
import {  useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import trainImg from '../classic_locomotive_train_312396.png';

const Header = (props) => {
  const {loggedIn}=useContext(AuthContext);
  
  return (
     <Navbar collapseOnSelect expand="md" bg="dark" sticky="top" variant="dark">
         <Navbar.Brand href="/">
             <img
                 alt=""
                 src={trainImg}
                 width="60"
                 height="30"
                 className="d-inline-block align-top"
             />{' '}
             Rail-Way
         </Navbar.Brand>
         
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
           <Navbar.Collapse id="responsive-navbar-nav">
             <Nav className="mr-auto">
             {
           loggedIn === false && (<>
           <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
           </>
           )}
           {
           loggedIn === true && (
             <>
              <Nav.Link href="/routes">Routes</Nav.Link>
              <Nav.Link href="/exceptions">Exceptions</Nav.Link>
              <Nav.Link href="/stations">Stations</Nav.Link>
              <Nav.Link href="/notifications">Notifications</Nav.Link>
             </>
           )
             
           }
              
              
            </Nav>
          </Navbar.Collapse>
      </Navbar>
  );
}

export default Header;
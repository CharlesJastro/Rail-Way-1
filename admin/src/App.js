<<<<<<< HEAD
import AdminExceptions from "./components/AdminExceptions";
import AdminNotifications from "./components/AdminNotifications";
import AdminRoutes from "./components/AdminRoutes";
import AdminStations from "./components/AdminStations";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from "./components/NotFound";

function App(){
  return(
    <Router>
    <div className="ui container">
      <Switch>
        <Route exact path="/adminnotifications">
        <AdminNotifications/>
        </Route>
        <Route path="/adminroutes">
      <AdminRoutes/>
      </Route>
      <Route path="/adminexception">
      <AdminExceptions/> 
      </Route> 
      <Route path="/adminstations">
      <AdminStations/>
      </Route>
      <Route path="*">
        <NotFound/>
      </Route>
      </Switch>
=======
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes} from './routes';

import "bootstrap/dist/css/bootstrap.min.css";


function App(){
  return(
    <div>
        <Router>
            <Routes/>
        </Router>
>>>>>>> 401503e3e4cf439918f0322c992b1c7da1399e73
    </div>
    </Router>
  );
}
export default App;

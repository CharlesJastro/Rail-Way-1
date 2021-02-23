/*import React from 'react';
import Header from './components/Header';
import {AdminRoutes} from './views/AdminRoutes';
import {AdminExceptions} from './views/AdminExceptions';
import {AdminStations} from './views/AdminStations';
import {AdminNotifications} from './views/AdminNotifications';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
//import AdminsLogin from "./components/AdminsLogin";
//import Register from './components/Auth/Register';
import Login from './components/Auth/Login'
import NotFound from "./components/NotFound";
import Register from './components/Auth/Register';
import AuthContext from './Context/AuthContext';
import {  useContext } from 'react';

export const Routes = () => {
   const {loggedIn}=useContext(AuthContext)
  // return (
  //   <div>
  //     {/* <Register/> *///}
  //     <Login/>
  //       <Header />
  //       <Switch>
  //           <Route exact path="/routes" component={AdminRoutes} />
  //           <Route exact path="/">
  //               <Redirect to="/routes" />
  //           </Route>
  //           <Route exact path="/exceptions" component={AdminExceptions} />
  //           <Route exact path="/stations" component={AdminStations} />
  //           <Route exact path="/notifications" component={AdminNotifications} />
  //           {/* <Route exact path="/login" component={AdminsLogin} /> */}
  //           <Route path="*" component={NotFound} />
  //       </Switch>
  //       {/*<NavBar />*/}
  //   </div>
  // );
  /*
  return(
    <BrowserRouter>
    
    <Switch>
      <Route>
      <Header/>
      </Route>
      
      {
        loggedIn === false && (
          <>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          </>
        )
      }
      {
        loggedIn ===true && (
          <>
        <Route>
      <Route exact path="/exceptions" component={AdminExceptions}/>
      <Route exact path="/stations" component={AdminStations} />
     <Route exact path="/notifications" component={AdminNotifications} />
     <Route exact path="/routes" component={AdminRoutes} />
     <Route path="*" component={NotFound} />
     </Route>
          </>
        )
      }
    
     
      
    </Switch>
    </BrowserRouter>
  )
}; */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
//import Register from './components/Auth/Register';
import Login from './components/Auth/Login'
import NavBar from './components/layout/NavBar';
import NotFound from './components/NotFound';
import {useContext} from 'react';
import {AdminStations} from './views/AdminStations';
import {AdminExceptions} from './views/AdminExceptions';
import {AdminRoutes} from './views/AdminRoutes';
import {AdminNotifications} from './views/AdminNotifications';
import AuthContext from './Context/AuthContext';
import Home from './components/home/Home';
//import Home from './components/home/Home';

function Router(){
  const {loggedIn} = useContext(AuthContext)
  return <BrowserRouter>
  <NavBar/>
  <Switch>
    <Route exact path="/">
      <Home/>
      </Route>
      {loggedIn ===false && (<>
        {/* <Route path="/register">
      <Register/>
    </Route> */}
    <Route path="/login">
      <Login/>
    </Route>
      </>)}
      {
        loggedIn ===true &&(
          <>
          <Route path="/notifications">
      <AdminNotifications/>
    </Route>
    <Route path="/routes">
      <AdminRoutes/>
    </Route>
    <Route path="/exceptions">
      <AdminExceptions/>
    </Route>
    <Route path="/stations">
      <AdminStations/>
    </Route>
    <Route path="/notfound">
      <NotFound/>
    </Route>
          </>
        )
      }
    
    
  </Switch>
  </BrowserRouter>
}
export default Router;
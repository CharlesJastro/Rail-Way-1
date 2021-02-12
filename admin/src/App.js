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
    </div>
    </Router>
  );
}
export default App;

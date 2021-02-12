import AdminExceptions from "./components/AdminExceptions";
import AdminNotifications from "./components/AdminNotifications";
import AdminRoutes from "./components/AdminRoutes";
import AdminsLogin from "./components/AdminsLogin";
import AdminStations from "./components/AdminStations";

import "bootstrap/dist/css/bootstrap.min.css";


function App(){
  return(
    
   
    <div className="ui container">
      {/* <AdminNotifications/>
      <AdminRoutes/>
      <AdminExceptions/>  
      <AdminStations/> */}
      <AdminsLogin/>
    </div>
  )
}
export default App;

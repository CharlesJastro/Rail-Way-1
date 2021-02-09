import AdminExceptions from "./components/AdminExceptions";
import AdminNotifications from "./components/AdminNotifications";
import AdminRoutes from "./components/AdminRoutes";
import AdminStations from "./components/AdminStations";

function App(){
  return(
    <div className="ui container">
      <AdminNotifications/>
      <AdminRoutes/>
      <AdminExceptions/>  
      <AdminStations/>
    </div>
  )
}
export default App;

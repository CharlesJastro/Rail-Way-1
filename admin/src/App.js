import AdminExceptions from "./components/AdminExceptions";
import AdminNotifications from "./components/AdminNotifications";
import AdminRoutes from "./components/AdminRoutes";

function App(){
  return(
    <div className="container">
      <AdminNotifications/>
      <AdminRoutes/>
      <AdminExceptions/>  
    </div>
  )
}
export default App;

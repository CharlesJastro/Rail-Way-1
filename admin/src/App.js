import AdminExceptions from "./components/AdminExceptions";
import AdminNotifications from "./components/AdminNotifications";

function App(){
  return(
    <div className="container">
      <AdminNotifications/>
      <AdminExceptions/>
    </div>
  )
}
export default App;
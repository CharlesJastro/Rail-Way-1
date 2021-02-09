import AdminExceptions from "./components/AdminExceptions";
import AdminRoutes from "./components/AdminRoutes";

function App() {
    return ( 
        <div className = "container" >
            <AdminRoutes / >
            <AdminExceptions / > 
        </div>
    )
}
export default App;

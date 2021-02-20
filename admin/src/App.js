// import React from 'react';
// import {BrowserRouter as Router} from 'react-router-dom';
// import {Routes} from './routes';

// import "bootstrap/dist/css/bootstrap.min.css";


// function App(){
//   return(
//     <div>
//         <Router>
//             <Routes/>
//         </Router>
//     </div>
//   );
// }
// export default App;
import React from 'react';
import Router from './Routes';
import {AuthContextProvider} from './Context/AuthContext'
function App(){
  return <AuthContextProvider>
  <Router/>
  </AuthContextProvider>
}
export default App;
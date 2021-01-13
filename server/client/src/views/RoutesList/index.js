// Import the React and ReactDOM libararies to access the codes in the react and react-dom files in the node_modules folder.
import React from 'react';
import ReactDOM from 'react-dom';

import RoutesList from './RoutesList';

// Create a react component
const App = function () {
    function getTime() {
        let currentTime = (new Date()).toLocaleTimeString();
        return currentTime;
    };

    // return JSX
    return ( 
        <div className="ui container comments">

            <RoutesList headingTrain="Train" headingDepart="Departure" headingArrive="Arrival" headingFare="Fare" />
            <RoutesList route="Abuja-Kaduna" departure="7:00 AM" arrival="9:15 AM" fare="N3000" />
            <RoutesList route="Kaduna-Abuja" departure="6:40 AM" arrival="8:43 AM" fare="N3000"/>
            <RoutesList route="Lagos-Ibadan" departure="4:00 PM" arrival="6:40 PM" fare="N2500" />
            <RoutesList route="Ibadan-Lagos" departure="8:00 AM" arrival="10:40 AM" fare="N2500"/>
            <RoutesList route="Warri-Itakpe" departure="10:00 AM" arrival="2:30 PM" fare="N3500"/>
            <RoutesList route="Itakpe-Warri" departure="3:30 PM" arrival="7:30 PM" fare="N3500"/>
            <RoutesList route="Abuja metro" departure="8:50 AM" arrival="9:40 AM" fare="N1000"/>

<br></br><br></br><hr></hr>
            <div>
                <div>Current Time:</div>
                <h3> {getTime()} </h3>
            </div>

        </div>
    );
};



// class App extends React.Component {

//     state = {        //State object. This is the only time we do direct assignment to this.state
//         timeNow: null,
//         errorMessage: " "
//     }

//     componentDidMount() {
//         // let currentTime = (new Date()).toLocaleTimeString();

//     new Date(

//                 presentTime => {
//                     console.log(new Date().getTime())
//                     this.setState({ timeNow: new Date().getTime })
//                 },
//                 err => {
//                     console.log(err);
//                     this.setState({ errorMessage: err.message })
//                 }
//             );
//     };

//     // componentDidUpdate() {
//     //     console.log("My component was just updated - it rerendered!");
//     // }

//     render() {
//         if (this.state.time) {
//         return (   //JSX below consisting of html and JS
//             <div>
//                 <div>Time: {this.state.time} </div>
//             </div>
//         )
//         };
//         return (  
//             <div>
//                 <div>Error: {this.state.errorMessage} </div>
//             </div>
//         )
//     }
// };    
// export { default as RoutesList } from './RoutesList';
// Render the react component on the screen
ReactDOM.render(<App />, document.querySelector('#root'));

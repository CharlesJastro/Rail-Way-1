import React from 'react';
/*import './App.css';*/
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes} from './routes';

function App() {
    return (
        <div className="ui container">
            <Router>
                <Routes/>
            </Router>
        </div>
    );
}

export default App;

import React from 'react';
import queryString from 'query-string';

class RouteDetails extends React.Component {
    componentDidMount() {
          
    }
    
    render() {
        // This line of code can grab the :name varable from the url
        let name = this.props.match.params.name; 
        
        return(
            <div>
                {/* Display Route Name */}
                <h1>{name}</h1>
                {/* Display the weekday. If there isn't a route scheduled on a certain day, either skip that weekday or display a message like "No service on {day}" */}
                <p>Weekday</p>
                <table>
                   <tbody>
                        <tr>
                            <th rowSpan="2">Train Code</th>
                            {/* From here we provide a variable number of stations each with a departure and arrival time except for the first and last stations. The first station would only have departure and the last will only have arrival */}
                            <th>Rigasa</th>
                            <th colSpan="2">Kubwa</th>
                            <th>Idu</th>
                        </tr>
                        <tr>
                            <td>Departure</td>
                            <td>Arrival</td>
                            <td>Departure</td>
                            <td>Arrival</td>
                        </tr>
                        <tr>
                            <td>KA1</td>
                            <td>6:40 AM</td>
                            <td>8:28 AM</td>
                            <td>8:31 AM</td>
                            <td>8:43 AM</td>
                        </tr>
                        <tr>
                            <td>KA2</td>
                            <td>10:35 AM</td>
                            <td>12:59 PM</td>
                            <td>1:04 PM</td>
                            <td>1:20 PM</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default RouteDetails;
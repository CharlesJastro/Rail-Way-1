import React from 'react';
import queryString from 'query-string';

// JS Class rendering route information for each train line
class RouteDetails extends React.Component {
    componentDidMount() {

    }

    render() {
        // This line of code can grab the :name varable from the url
        let name = this.props.match.params.name;

        // To obtain the exact weekday as a string.
        let currentDay = new Date().getDay();

        let weekdays = new Array(7);
        weekdays[0] = "Sunday";
        weekdays[1] = "Monday";
        weekdays[2] = "Tuesday";
        weekdays[3] = "Wednesday";
        weekdays[4] = "Thursday";
        weekdays[5] = "Friday";
        weekdays[6] = "Saturday";

        // Returns schedule for Monday - Saturday, else returns Sunday which is day 0.
        if (currentDay > 0) {
            return (
                <div>
                    {/* Display Route Name */}
                    <h1>{name}</h1>
                    {/* Display the exct weekday as a string. If there isn't a route scheduled on a certain day, either skip that weekday or display a message like "No service on {day}" */}
                    {/* <p>Weekday</p> */}
                    <h2>{weekdays[currentDay]}</h2>
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
                            <tr>
                                <td>KA3</td>
                                <td>2:00 PM</td>
                                <td>3:58 PM</td>
                                <td>4:03 PM</td>
                                <td>4:16 PM</td>
                            </tr>
                            <tr>
                                <td>KA4</td>
                                <td>6:00 PM</td>
                                <td>8:04 PM</td>
                                <td>8:07 PM</td>
                                <td>8:20 PM</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
        else {
            return (
                <div>
                {/* Display Route Name */}
                <h1>{name}</h1>
                {/* Display the exct weekday as a string. If there isn't a route scheduled on a certain day, either skip that weekday or display a message like "No service on {day}" */}
                {/* <p>Weekday</p> */}
                <h2>{weekdays[currentDay]}</h2>
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
                            <td>1:00 PM</td>
                            <td>2:49 PM</td>
                            <td>2:54 PM</td>
                            <td>3:06 PM</td>
                        </tr>
                        <tr>
                            <td>KA2</td>
                            <td>4:00 PM</td>
                            <td>6:02 PM</td>
                            <td>6:07 PM</td>
                            <td>6:21 PM</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            )
        };
    }
}

export default RouteDetails;
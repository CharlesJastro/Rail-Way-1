import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import {DateTime} from 'luxon';
import {ListItem} from '../../components/ListItem';
import './RoutesList.css';

class RoutesList extends Component {
    constructor() {
        super();
        this.state = {
            routes: [],
            time: 0
        }
        this.getRoutes = this.getRoutes.bind(this);
    }
    
    componentDidMount() {
        this.getRoutes();
        this.setState({time: new Date()});
        console.log(this.state.time.getHour);
    }
    
    async getRoutes() {
        let data = await axios
            .get('/routes')
            .then(function(response) {
                return response;
            }).catch(function(error) {
                console.log(error);
            });
        this.setState({routes: data.data});
        console.log(this.state.routes);
    }
    
    render() {
        return (
            <div className="ui container routesList">
                <h2>Routes List</h2>
                <table style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <th>Route</th>
                            <th>Departure Time</th>
                            <th>Arrival Time</th>
                            <th>Fare</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.routes.filter(route => DateTime.fromObject({hour: route.departureHour, minute: route.departureMinute}) > DateTime.fromObject({hour: this.state.time.getHours(), minute: this.state.time.getMinutes()})).sort((a, b) => a.departureHour-b.departureHour || a.departureMinute-b.departureMinute).filter((route, index, self) => index === self.findIndex((t) => (t.name === route.name))).map((route, index) => (
                        <ListItem key={route._id} id={route._id} data={[route.name, (DateTime.fromObject({hour: route.departureHour, minute: route.departureMinute}).toLocaleString(DateTime.TIME_SIMPLE)), (DateTime.fromObject({hour: route.arrivalHour, minute: route.arrivalMinute}).toLocaleString(DateTime.TIME_SIMPLE)), route.fare]}/>
                        //<li key={route.id}>{route.name} {route.departureHour}:{route.departureMinute} {route.arrivalHour}:{route.arrivalMinute}</li>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default RoutesList;


/*{this.state.routes.map((route, index) => (
                        <ListItem key={route._id} data={route}/>
                        //<li key={route.id}>{route.name} {route.departureHour}:{route.departureMinute} {route.arrivalHour}:{route.arrivalMinute}</li>
                    ))}*/


//    <div style={{ display: "flex", flexDirection: "column", alignContent: "center",  backgroundColor:"orange"}}>
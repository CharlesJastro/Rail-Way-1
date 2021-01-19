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
                <h4>Schedule Timezone: America/Edmonton</h4>
                <h4>Your Timezone: {DateTime.local().zoneName}</h4>
                {console.log(DateTime.local().weekday)}
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
                        {this.state.routes.map((route, index) => (
                            console.log('This needs to be implemented')
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default RoutesList;

/* <ListItem key={route._id} id={index} data={[route.name, DateTime.fromISO(route.departure).toLocaleString(DateTime.TIME_SIMPLE), DateTime.fromISO(route.arrival).toLocaleString(DateTime.TIME_SIMPLE), route.fare]}/> */
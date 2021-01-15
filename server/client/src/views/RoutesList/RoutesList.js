import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import {ListItem} from '../../components/ListItem';
import './RoutesList.css';
import {DateTime} from 'luxon';

class RoutesList extends Component {
    constructor() {
        super();
        this.state = {
            routes: []
        }
        this.getRoutes = this.getRoutes.bind(this);
    }
    
    componentDidMount() {
        this.getRoutes();
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
                    {this.state.routes.map((route, index) => (
                        <ListItem key={route.id} data={route}/>
                        //<li key={route.id}>{route.name} {route.departureHour}:{route.departureMinute} {route.arrivalHour}:{route.arrivalMinute}</li>
                    ))}
                </table>
            </div>
        );
    }
};

export default RoutesList;





//    <div style={{ display: "flex", flexDirection: "column", alignContent: "center",  backgroundColor:"orange"}}>
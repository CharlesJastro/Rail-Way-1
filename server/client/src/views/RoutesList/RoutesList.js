import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';

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
        this.setState({routes: data.data}, () => {
            console.log(this.state.routes);
        });
    }
    
    render() {
        return (
            <div className="ui container">
                <h2>Routes List</h2>
                <ul>
                    {this.state.routes.map((route, index) => (
                        <li>{route.name} {route.departureHour}:{route.departureMinute} {route.arrivalHour}:{route.arrivalMinute}</li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default RoutesList;





//    <div style={{ display: "flex", flexDirection: "column", alignContent: "center",  backgroundColor:"orange"}}>
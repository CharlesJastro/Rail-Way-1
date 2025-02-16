import React from 'react';
import {Header} from './components/Header';
import {NavBar} from './components/NavBar';
import {RoutesList} from './views/RoutesList';
import {Travel} from './views/Travel';
import {TravelStations} from './views/Travel';
import {Favourites} from './views/Favourites';
import {RouteDetails} from './components/RouteDetails';
import NotificationField from './components/NotificationField';
import { Route, Switch, Redirect } from 'react-router-dom';
import './routes.css';

export const Routes = () => {
  return (
    <div className="ui segment">
        <Header />
        <NotificationField />
        <Switch>
            <Route exact path="/" component={RoutesList} />
            <Route exact path="/">
                <Redirect to="/" />
            </Route>
            <Route exact path="/travel" component={Travel} />
            <Route exact path="/travelstations" component={TravelStations} />
            <Route exact path="/favourites" component={Favourites} />
            <Route path="/route/:name" component={RouteDetails}/>
        </Switch>
        <NavBar />
    </div>
  );
};


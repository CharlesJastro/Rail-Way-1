import React from 'react';
import {Header} from './components/Header';
import {NavBar} from './components/NavBar';
import {RoutesList} from './views/RoutesList';
import {Travel} from './views/Travel';
import {Favourites} from './views/Favourites';
import {RouteDetails} from './components/RouteDetails';
import { Route, Switch, Redirect } from 'react-router-dom';
import './routes.css';

const notifications = [
    {
        title: 'Test Info Notification',
        urgency: 'info',
        message: 'Just a test'
    },
    {
        title: 'Test Alert Notification',
        urgency: 'alert',
        message: 'Just a test'
    }
]

export const Routes = () => {
  return (
    <div className="ui segment">
        <Header />
        {notifications.map((notice) => (
            <div className={'notice-'+notice.urgency}>
                <h3>{notice.title}</h3>
                <p>{notice.message}</p>
            </div>  
        ))}
        <Switch>
            <Route exact path="/" component={RoutesList} />
            <Route exact path="/">
                <Redirect to="/" />
            </Route>
            <Route exact path="/travel" component={Travel} />
            <Route exact path="/favourites" component={Favourites} />
            <Route path="/route/:name" component={RouteDetails}/>
        </Switch>
        <NavBar />
    </div>
  );
};


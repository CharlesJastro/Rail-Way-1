import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar';
import { RoutesList } from './views/RoutesList';
import { Travel } from './views/Travel';
import { TravelStations } from './views/Travel';
import { Favourites } from './views/Favourites';
import { RouteDetails } from './components/RouteDetails';
import NotificationField from './components/NotificationField';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import './routes.css';
import ReactGA from 'react-ga';
// import AppConfig from '../../App.config';

// ReactGA.initialize(AppConfig.GOOGLE.GA_TRACKING_CODE);

function usePageViews() {
  let location = useLocation();
  useEffect(
    () => {
      if (!window.GA_INITIALIZED) {
        ReactGA.initialize("UA-193204199-2");
        window.GA_INITIALIZED = true;
      }
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    }, [location]
  );
}


export const Routes = () => {
  usePageViews()
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
        <Route path="/route/:name" component={RouteDetails} />
      </Switch>
      <NavBar />
    </div>
  );
};


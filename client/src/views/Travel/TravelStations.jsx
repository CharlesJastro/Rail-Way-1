import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


class TravelStations extends Component {

  render() {
    return (
      <div>
         <h3>Travel View</h3>
         <Button variant="contained">My Favourites</Button>
         <Button variant="contained">From Map</Button> <hr/> <br/><br/><br/>
         <p>Abuja (Idu)</p>
         <p>Abuja (Kubwa)</p>
         <p>Kaduna (Rigasa)</p>
         {/* 
         <Button color="primary">To:    Station</Button> <hr/>
         <Button color="secondary">Depart At:    Now</Button> <hr/>
         <Button disabled>Disabled</Button>
         <Button href="#text-buttons" color="primary">Link</Button> */}
      </div>
    )
  }

};

export default TravelStations;
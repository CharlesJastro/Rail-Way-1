import React, { Component } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {TravelStations} from './TravelStations';
//import GoogleMap from '../../components/GoogleMap';


class Travel extends Component {

  render() {
    return (
      <div>
         <h3>Travel View</h3>
         <Button onClick={()=>window.location.href = "./travelstations" }>From:     Station</Button> <hr/>
         <Button>To:     Station</Button> <hr/>
         <Button>Depart At:     Now</Button> <hr/> <br/><br/><br/>
         <Button variant="contained">Find</Button><br/><br/><br/><br/>
         

         {/* <Button variant="contained">My Favourites</Button>
         <Button variant="contained">From Map</Button> <hr/> <br/><br/><br/>
         <p>Abuja (Idu)</p>
         <p>Abuja (Kubwa)</p>
         <p>Kaduna (Rigasa)</p> */}
         {/* 
         <Button color="primary">To:    Station</Button> <hr/>
         <Button color="secondary">Depart At:    Now</Button> <hr/>
         <Button disabled>Disabled</Button>
         <Button href="#text-buttons" color="primary">Link</Button> */}
      </div>
    )
  }

};

export default Travel;


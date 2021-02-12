import React, { Component } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {TravelStations} from './TravelStations';
import Calendar from 'react-calendar'
//import GoogleMap from '../../components/GoogleMap';


class Travel extends Component {

  render() {
    return (
      <div>
         <h3>Travel View</h3>
         <Button onClick={()=>window.location.href = "./travelstations" }>From:     Station</Button> <hr/>
         <Button onClick={()=>window.location.href = "./travelstations" }>To:     Station</Button> <hr/>
         <Button onClick={()=>window.location.href = './travel' }>Depart At:     Now</Button> <hr/> <br/><br/><br/>
         <Calendar />
         <Button variant="contained">Find</Button><br/><br/><br/><br/>
         

         {/* <Button color="primary">To:    Station</Button> <hr/>
         <Button color="secondary">Depart At:    Now</Button> <hr/>
         <Button disabled>Disabled</Button>
         <Button href="#text-buttons" color="primary">Link</Button> */} 
      </div>
    )
  }

};

export default Travel;


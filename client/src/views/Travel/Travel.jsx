import React, { Component } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import {TravelStations} from './TravelStations';
import Calendar from 'react-calendar'
//import GoogleMap from '../../components/GoogleMap';
import { Button , Icon } from 'semantic-ui-react'

class Travel extends Component {

  render() {
    return (
      <div>
         <h3>Travel View</h3>
<<<<<<< HEAD
         <Button onClick={()=>window.location.href = "./travelstations" }>From:     Station</Button> <hr/>
         <Button onClick={()=>window.location.href = "./travelstations" }>To:     Station</Button> <hr/>
         <Button onClick={()=>window.location.href = './travel' }>Depart At:     Now</Button> <hr/> <br/><br/><br/>
         <Calendar />
         <Button variant="contained">Find</Button><br/><br/><br/><br/>
=======
         <Button onClick={()=>window.location.href = "./travelstations" }>From:  Station</Button> <hr/>
         <Button>To:  Station</Button> <hr/>
         <Button>Depart At:  Now</Button> <hr/> <br/><br/><br/>
         <Button animated>
           <Button.Content visible>Find</Button.Content>
           <Button.Content hidden>
             <Icon name='arrow down' />
           </Button.Content>
           </Button>
         <br/><br/><br/><br/>
>>>>>>> 81d0d0a7a0474a67cff9e0f872fe6f83a9a9999a
         

         {/* <Button color="primary">To:    Station</Button> <hr/>
         <Button color="secondary">Depart At:    Now</Button> <hr/>
         <Button disabled>Disabled</Button>
         <Button href="#text-buttons" color="primary">Link</Button> */} 
      </div>
    )
  }

};

export default Travel;


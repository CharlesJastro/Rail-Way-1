import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import { useState } from 'react';
import Modal from 'react-modal';




class TravelStations extends Component {

  render() {
    return (
      <div>
         <h3>Travel View</h3> 
        
      <Button variant="contained">My Favourites</Button>
    
         <Button variant="contained">From Map</Button> <hr/> <br/><br/><br/>
         <h3>Travel View</h3>
         <Button>Abuja (Idu)   </Button> <hr/>
         <Button>ABUJA (Kubwa)       </Button> <hr/>
         <Button>Kaduna (Rigasa)     </Button> <hr/> <br/><br/><br/>
         
         
         
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
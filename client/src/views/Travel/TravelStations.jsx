import React, { Component } from 'react';
<<<<<<< HEAD
//import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
=======
import Button from '@material-ui/core/Button'
>>>>>>> 81d0d0a7a0474a67cff9e0f872fe6f83a9a9999a


class TravelStations extends Component {

  render() {
    return (
      <div>
<<<<<<< HEAD
         <h3>Travel View</h3>
         <Button variant="contained" >My Favourites</Button>
=======
         <h3>Travel View</h3> 
        
      <Button variant="contained">My Favourites</Button>
    
>>>>>>> 81d0d0a7a0474a67cff9e0f872fe6f83a9a9999a
         <Button variant="contained">From Map</Button> <hr/> <br/><br/><br/>
         <h3>Travel View</h3>
         <Button onClick={()=>window.location.href = "./travelstations" }> Abuja (Idu)   </Button> <hr/>
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
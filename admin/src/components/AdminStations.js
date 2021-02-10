import React,{Component}from 'react';
import axios from 'axios';
import {Modal,ModalHeader, ModalBody,ModalFooter,Table,Button, Label, Input, FormGroup} from 'reactstrap';
//import { getWeekDay } from '../utils/getWeekDay';

class AdminStations extends Component{
  state={
    stations:[],
    newStationData:{
      name:'',
      code:'',
      day:'',
      startingStation:'',
      endingStation:'',
      departureHour:'',
      departureMinute:'',
      arrivalHour:'',
      arrivalMinute:'',
      fare:'',
      
    },
    editStationData:{
      _id:'',
      name:'',
       code:'',
      day:'',
      startingStation:'',
      endingStation:'',
      departureHour:'',
      departureMinute:'',
      arrivalHour:'',
      arrivalMinute:'',
      fare:'',
     
    },
    newStationModal:false,
    editStationModal:false
  }
  //GET THE DATA FROM API
  componentDidMount(){
    this._refreshstations();
  }
  toggleNewStationModal(){
    this.setState({
      newStationModal: !this.state.newStationModal
    })
  }
  toggleEditStationModal(){
    this.setState({
      editStationModal: !this.state.editStationModal
    })
  }
  // ADD/POST REQUEST
  addStation(){
    axios.post('/stations', this.state.newStationData).then((response)=>{
      let{ stations } = this.state;
      stations.push(response.data);
      this.setState({stations, newStationModal:false, newStationData:{
       name:'',
      code:'',
      day:'',
      startingStation:'',
      endingStation:'',
      departureHour:'',
      departureMinute:'',
      arrivalHour:'',
      arrivalMinute:'',
      fare:'',
      
    }})
    });
  }
  //UPDATE OR EDIT
  updateStation(){
    let{ name, code, day, startingStation, endingStation, departureHour, departureMinute,arrivalHour,arrivalMinute,fare}=this.state.editStationData;
    axios.patch('/stations/' + this.state.editStationData._id,{
      name, code, day, startingStation, endingStation, departureHour, departureMinute,arrivalHour,arrivalMinute,fare
    }).then((response)=>{
      this._refreshstations()
      this.setState({
        editStationModal:false, editStationData:{
     _id:'',
      name:'',
      code:'',
      day:'',
      startingStation:'',
      endingStation:'',
      departureHour:'',
      departureMinute:'',
      arrivalHour:'',
      arrivalMinute:'',
      fare:'',
      
        }
      })
     
    })
  }
  editStation(_id,name,code, day, startingStation, endingStation, departureHour, departureMinute,arrivalHour,arrivalMinute,fare){
    this.setState({
      editStationData:{_id,name,code, day, startingStation, endingStation, departureHour, departureMinute,arrivalHour,arrivalMinute,fare}, editStationModal:! this.state.editStationModal
    });
  }
  //DELETE Station
  deleteStation(_id){
  axios.delete('/stations/' + _id).then((response)=>{
      this._refreshstations();
    })
  }
  _refreshstations(){
    axios.get('/stations').then((response)=>{
      this.setState({
        stations:response.data
      })
    })
  }
  
  
  render(){
    let stations=this.state.stations.map((station)=>{
      return(
        <tr key={station._id}>
              <td>{station.name}</td>
              <td>{station.code}</td>
              <td>{station.day}</td>
              <td>{station.startingStation}</td>
              <td>{station.endingStation}</td>
              <td>{station.departureHour}</td>
              <td>{station.departureMinute}</td>
              <td>{station.arrivalHour}</td>
              <td>{station.arrivalMinute}</td>
              <td>{station.fare}</td>
              
              <td>
                <Button color="success" size="sm" className="mr-2" onClick={this.editStation.bind(this, station._id,station.name, station.code,station.day,station.startingStation, station.endingStation, station.departureHour, station.departureMinute, station.arrivalHour,station.arrivalMinute, station.fare)}>Edit</Button>
                <Button color="danger" size="sm" onClick={this.deleteStation.bind(this, station._id)}>Delete</Button>
              </td>
            </tr>
      )
    });
    return(
      <div className="App container">
        <h2>RAILWAY ADMIN PAGE - STATIONS</h2>

<Button className="my-3" color="primary" onClick={this.toggleNewStationModal.bind(this)}>Create</Button>
{/* POST MODEL START */}
      <Modal isOpen={this.state.newStationModal} toggle={this.toggleNewStationModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewStationModal.bind(this)}>Add New Station</ModalHeader>
        <ModalBody>
           <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" value={this.state.newStationData.name} onChange={(e)=>{
              let {newStationData}=this.state;
              newStationData.name=e.target.value;
              this.setState({newStationData})
            }}/>
          </FormGroup>
            <FormGroup>
            <Label for="code">Code</Label>
            <Input id="code" value={this.state.newStationData.code} onChange={(e)=>{
              let {newStationData}=this.state;
              newStationData.code=e.target.value;
              this.setState({newStationData})
            }}/>
          </FormGroup>

         
          <FormGroup>
            <Label for="day">Day</Label>
            <Input id="day" value={this.state.newStationData.day} onChange={(e)=>{
              let {newStationData}=this.state;
              newStationData.day=e.target.value;
              this.setState({newStationData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="startingStation">StartingStation</Label>
            <Input id="startingStation" value={this.state.newStationData.startingStation} onChange={(e)=>{
              let {newStationData}=this.state;
              newStationData.startingStation=e.target.value;
              this.setState({newStationData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="endingStation">EndingStation</Label>
            <Input id="endingStation" value={this.state.newStationData.endingStation} onChange={(e)=>{
              let {newStationData}=this.state;
              newStationData.endingStation=e.target.value;
              this.setState({newStationData})
            }}/>
          </FormGroup>
          
          
          <FormGroup>
            <Label for="departureHour">DepartureHour</Label>
            <Input id="departureHour" value={this.state.newStationData.departureHour} onChange={(e)=>{
              let {newStationData}=this.state;
              newStationData.departureHour=e.target.value;
              this.setState({newStationData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="departureMinute">DepartureMinute</Label>
            <Input id="departureMinute" value={this.state.newStationData.departureMinute} onChange={(e)=>{
              let {newStationData}=this.state;
              newStationData.departureMinute=e.target.value;
              this.setState({newStationData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="arrivalHour">ArrivalHour</Label>
            <Input id="arrivalHour" value={this.state.newStationData.arrivalHour} onChange={(e)=>{
              let {newStationData}=this.state;
              newStationData.arrivalHour=e.target.value;
              this.setState({newStationData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="arrivalMinute">ArrivalMinute</Label>
            <Input id="arrivalMinute" value={this.state.newStationData.arrivalMinute} onChange={(e)=>{
              let {newStationData}=this.state;
              newStationData.arrivalMinute=e.target.value;
              this.setState({newStationData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="fare">Fare</Label>
            <Input id="fare" value={this.state.newStationData.fare} onChange={(e)=>{
              let {newStationData}=this.state;
              newStationData.fare=e.target.value;
              this.setState({newStationData})
            }}/>
          </FormGroup>
          

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addStation.bind(this)}>ADD</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewStationModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* EDIT MODEL START */}

      <Modal isOpen={this.state.editStationModal} toggle={this.toggleEditStationModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditStationModal.bind(this)}>Edit</ModalHeader>
        <ModalBody>
           
          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" value={this.state.editStationData.name} onChange={(e)=>{
              let {editStationData}=this.state;
              editStationData.name=e.target.value;
              this.setState({editStationData})
            }}/>
          </FormGroup>
           <FormGroup>
            <Label for="code">Code</Label>
            <Input id="code" value={this.state.editStationData.code} onChange={(e)=>{
              let {editStationData}=this.state;
              editStationData.code=e.target.value;
              this.setState({editStationData})
            }}/>
          </FormGroup>

          <FormGroup>
            <Label for="day">Day</Label>
            <Input id="day" value={this.state.editStationData.day} onChange={(e)=>{
              let {editStationData}=this.state;
              editStationData.day=e.target.value;
              this.setState({editStationData})
            }}/>
          </FormGroup>
           <FormGroup>
            <Label for="startingStation">StartingStation</Label>
            <Input id="startingStation" value={this.state.editStationData.startingStation} onChange={(e)=>{
              let {editStationData}=this.state;
              editStationData.startingStation=e.target.value;
              this.setState({editStationData})
            }}/>
          </FormGroup>
         
           <FormGroup>
            <Label for="endingStation">EndingStation</Label>
            <Input id="endingStation" value={this.state.editStationData.endingStation} onChange={(e)=>{
              let {editStationData}=this.state;
              editStationData.endingStation=e.target.value;
              this.setState({editStationData})
            }}/>
          </FormGroup>
         

          <FormGroup>
            <Label for="departureHour">DepartureHour</Label>
            <Input id="departureHour" value={this.state.editStationData.departureHour} onChange={(e)=>{
              let {editStationData}=this.state;
              editStationData.departureHour=e.target.value;
              this.setState({editStationData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="departureMinute">DepartureMinute</Label>
            <Input id="departureMinute" value={this.state.editStationData.departureMinute} onChange={(e)=>{
              let {editStationData}=this.state;
              editStationData.departureMinute=e.target.value;
              this.setState({editStationData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="arrivalHour">ArrivalHour</Label>
            <Input id="arrivalHour" value={this.state.editStationData.arrivalHour} onChange={(e)=>{
              let {editStationData}=this.state;
              editStationData.arrivalHour=e.target.value;
              this.setState({editStationData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="arrivalMinute">ArrivalMinute</Label>
            <Input id="arrivalMinute" value={this.state.editStationData.arrivalMinute} onChange={(e)=>{
              let {editStationData}=this.state;
              editStationData.arrivalMinute=e.target.value;
              this.setState({editStationData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="fare">Fare</Label>
            <Input id="fare" value={this.state.editStationData.fare} onChange={(e)=>{
              let {editStationData}=this.state;
              editStationData.fare=e.target.value;
              this.setState({editStationData})
            }}/>
          </FormGroup>
          

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateStation.bind(this)}>Update</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditStationModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Day</th>
              <th>Starting Station</th>
              <th>Ending Station</th>
              <th>Departure Hour</th>
              <th>Departure Minute</th>
              <th>Arrival Hour</th>
              <th>Arrival Minute</th>
              <th>Fare</th>
              

            </tr>
          </thead>
          <tbody>
            {stations}
          </tbody>
        </Table>
      </div>
    )
  }
}
export default AdminStations;
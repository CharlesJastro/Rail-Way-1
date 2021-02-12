import React,{Component}from 'react';
import axios from 'axios';
import {DateTime} from 'luxon';
import {Modal,ModalHeader, ModalBody,ModalFooter,Table,Button, Label, Input, FormGroup} from 'reactstrap';
import { getWeekDay } from '../../utils/getWeekDay';
import TimePicker from 'react-time-picker';
import {FaTrashAlt} from 'react-icons/fa';
import {FaPencilAlt} from 'react-icons/fa';
import {currencySymbol} from '../../utils/currency';

class AdminStations extends Component{
  state={
    stations:[],
    departureDateTime: '',
    arrivalDateTime: '',
    newStationData:{
      name:'',
      code:'',
      day:0,
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
    });
    if (!this.state.newRouteModel) {
        this.resetAddForm();
    }
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
      day:0,
      startingStation:'',
      endingStation:'',
      departureHour:'',
      departureMinute:'',
      arrivalHour:'',
      arrivalMinute:'',
      fare:'',      
    },
    departureDateTime: '',
    arrivalDateTime: ''
    })
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
      
        },
      departureDateTime: '',
      arrivalDateTime: ''
      })
     
    })
  }
  editStation(_id,name,code, day, startingStation, endingStation, departureHour, departureMinute,arrivalHour,arrivalMinute,fare){
    this.setState({
      editStationData:{_id,name,code, day, startingStation, endingStation, departureHour, departureMinute,arrivalHour,arrivalMinute,fare}, editStationModal:! this.state.editStationModal,
        departureDateTime: `${departureHour}:${departureMinute}`,
        arrivalDateTime: `${arrivalHour}:${arrivalMinute}`
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
  
resetAddForm() {
    this.setState({
        newStationData:{
          name:'',
          code:'',
          day:0,
          startingStation:'',
          endingStation:'',
          departureHour:'',
          departureMinute:'',
          arrivalHour:'',
          arrivalMinute:'',
          fare:''
        },
        departureDateTime: '',
        arrivalDateTime: ''
    })
}
  
  render(){
    let stations=this.state.stations.map((station)=>{
      return(
        <tr key={station._id}>
              <td>{station.name}</td>
              <td>{station.code}</td>
              <td>{getWeekDay(station.day)}</td>
              <td>{station.startingStation}</td>
              <td>{station.endingStation}</td>
              <td>{DateTime.fromObject({hour: station.departureHour, minute: station.departureMinute}).toLocaleString(DateTime.TIME_SIMPLE)}</td>
              <td>{DateTime.fromObject({hour: station.arrivalHour, minute: station.arrivalMinute}).toLocaleString(DateTime.TIME_SIMPLE)}</td>
              <td>{currencySymbol}{station.fare}</td>
              
              <td>
                <Button color="btn btn-outline-success" size="sm" className="mr-2" onClick={this.editStation.bind(this, station._id,station.name, station.code,station.day,station.startingStation, station.endingStation, station.departureHour, station.departureMinute, station.arrivalHour,station.arrivalMinute, station.fare)} datatoggle="tooltip" dataplacement="top" title="Edit Station"><FaPencilAlt/></Button>
                <Button color="btn btn-outline-danger" size="sm" onClick={this.deleteStation.bind(this, station._id)} datatoggle="tooltip" dataplacement="top" title="Delete Station"><FaTrashAlt/></Button>
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
            <br />
            <select id="day" value={this.state.newStationData.day} onChange={(e)=> {
                let {newStationData}=this.state;
                newStationData.day=e.target.value;
                this.setState({newStationData});
            }}>
                <option value={0}>Sunday</option>
                <option value={1}>Monday</option>
                <option value={2}>Tuesday</option>
                <option value={3}>Wednesday</option>
                <option value={4}>Thursday</option>
                <option value={5}>Friday</option>
                <option value={6}>Saturday</option>
            </select>
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
            <Label for="departure">Departure</Label>
             <br/>
              <TimePicker
                id="departure"
                  onChange={(e) => {
                      let {departureDateTime}=this.state;
                      let {newStationData}=this.state;
                      let [hours, minutes] = [0,0];
                      departureDateTime = e;
                      try{
                          [hours, minutes] = e.split(':');
                      } catch (err) {
                          [hours, minutes] = [0,0];
                      }
                      this.setState({departureDateTime});
                      newStationData.departureHour=hours;
                      newStationData.departureMinute=minutes;
                      this.setState({newStationData});
                  }}
                  value={this.state.departureDateTime}
              />
          </FormGroup>
          <FormGroup>
            <Label for="arrival">Arrival</Label>
             <br/>
              <TimePicker
                id="arrival"
                  onChange={(e) => {
                      let {arrivalDateTime}=this.state;
                      let {newStationData}=this.state;
                      let [hours, minutes] = [0,0];
                      arrivalDateTime = e;
                      try{
                          [hours, minutes] = e.split(':');
                      } catch (err) {
                          [hours, minutes] = [0,0];
                      }
                      this.setState({arrivalDateTime});
                      newStationData.arrivalHour=hours;
                      newStationData.arrivalMinute=minutes;
                      this.setState({newStationData});
                  }}
                  value={this.state.arrivalDateTime}
              />
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
            <br />
            <select id="day" value={this.state.editStationData.day} onChange={(e)=> {
                let {editStationData}=this.state;
                editStationData.day=e.target.value;
                this.setState({editStationData});
            }}>
                <option value={0}>Sunday</option>
                <option value={1}>Monday</option>
                <option value={2}>Tuesday</option>
                <option value={3}>Wednesday</option>
                <option value={4}>Thursday</option>
                <option value={5}>Friday</option>
                <option value={6}>Saturday</option>
            </select>
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
            <Label for="departure">Departure</Label>
             <br/>
              <TimePicker
                id="departure"
                  onChange={(e) => {
                      let {departureDateTime}=this.state;
                      let {editStationData}=this.state;
                      let [hours, minutes] = [0,0];
                      departureDateTime = e;
                      try{
                          [hours, minutes] = e.split(':');
                      } catch (err) {
                          [hours, minutes] = [0,0];
                      }
                      this.setState({departureDateTime});
                      editStationData.departureHour=hours;
                      editStationData.departureMinute=minutes;
                      this.setState({editStationData});
                  }}
                  value={this.state.departureDateTime}
              />
          </FormGroup>
          <FormGroup>
            <Label for="arrival">Arrival</Label>
             <br/>
              <TimePicker
                id="arrival"
                  onChange={(e) => {
                      let {arrivalDateTime}=this.state;
                      let {editStationData}=this.state;
                      let [hours, minutes] = [0,0];
                      arrivalDateTime = e;
                      try{
                          [hours, minutes] = e.split(':');
                      } catch (err) {
                          [hours, minutes] = [0,0];
                      }
                      this.setState({arrivalDateTime});
                      editStationData.arrivalHour=hours;
                      editStationData.arrivalMinute=minutes;
                      this.setState({editStationData});
                  }}
                  value={this.state.arrivalDateTime}
              />
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
              <th>Departure</th>
              <th>Arrival</th>
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
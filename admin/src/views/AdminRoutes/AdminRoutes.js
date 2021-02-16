import React,{Component}from 'react';
import axios from 'axios';
import {DateTime} from 'luxon';
import {Modal,ModalHeader, ModalBody,ModalFooter,Table,Button, Label, Input, FormGroup} from 'reactstrap';
import {getWeekDay} from '../../utils/getWeekDay.js';
import TimePicker from 'react-time-picker';
import {FaTrashAlt} from 'react-icons/fa';
import {FaPencilAlt} from 'react-icons/fa';
import {FcAddRow} from 'react-icons/fc'
import {currencySymbol} from '../../utils/currency';
import AddRoute from '../../components/AddRoute';

class AdminRoutes extends Component{
  state={
    routes:[],
    departureDateTime: '',
    arrivalDateTime: '',
    editRouteData:{
      _id:'',
      name:'',
      status:'',
      day:'',
      departureHour:'',
      departureMinute:'',
      arrivalHour:'',
      arrivalMinute:'',
      fare:''
    },
    newExceptionData:{
      routeId:'',
      name:'',
      status:'',
      day:'',
      departureHour:'',
      departureMinute:'',
      arrivalHour:'',
      arrivalMinute:'',
      fare:''
    },
    editRouteModal:false,
    newExceptionModal:false,
    deleteRouteModal: false,
    deleteRouteID: 0
  }
  //GET THE DATA FROM API
  componentDidMount(){
    this._refreshRoutes();
  }
  toggleEditRouteModal(){
    this.setState({
      editRouteModal: !this.state.editRouteModal
    })
  }
  toggleNewExceptionModal(){
    this.setState({
      newExceptionModal: !this.state.newExceptionModal
    })
  }
  toggleDeleteRouteModal(){
    this.setState({
      deleteRouteModal: !this.state.deleteRouteModal
    })
  }
  // ADD/POST REQUEST
  addRoute(route){
      let{ routes } = this.state;
      routes.push(route);
      this.setState({routes})
  }
  addException(){
    axios.post('/exceptions', this.state.newExceptionData).then((response)=>{
      this.setState({newExceptionModal:false, newExceptionData:{
      routeId:'',
      name:'',
      status:'',
      day:'',
      departureHour:'',
      departureMinute:'',
      arrivalHour:'',
      arrivalMinute:'',
      fare:''
    }})
    });
  }
  createException(routeId,name,status,day,departureHour,departureMinute,arrivalHour,arrivalMinute,fare){
      this.setState({
      newExceptionData:{routeId,name,status,day,departureHour,departureMinute,arrivalHour,arrivalMinute,fare}, newExceptionModal:! this.state.newExceptionModal,
      departureDateTime: `${departureHour}:${departureMinute}`,
      arrivalDateTime: `${arrivalHour}:${arrivalMinute}`
    });
  };
  //UPDATE OR EDIT
  updateRoute(){
    let{ name, status, day, departureHour, departureMinute, arrivalHour, arrivalMinute, fare}=this.state.editRouteData;
    axios.patch('/routes/' + this.state.editRouteData._id,{
      name, status, day, departureHour, departureMinute, arrivalHour, arrivalMinute, fare
    }).then((response)=>{
      this._refreshRoutes()
      this.setState({
        editRouteModal:false, editRouteData:{
      _id:'',
      name:'',
      status:'',
      day:'',
      departureHour:'',
      departureMinute:'',
      arrivalHour:'',
      arrivalMinute:'',
      fare:''
        }
      })
     
    })
  }
  editRoute(_id,name,status,day,departureHour,departureMinute,arrivalHour,arrivalMinute,fare){
    this.setState({
      editRouteData:{_id,name,status,day,departureHour,departureMinute,arrivalHour,arrivalMinute,fare}, editRouteModal:! this.state.editRouteModal,
      departureDateTime: `${departureHour}:${departureMinute}`,
      arrivalDateTime: `${arrivalHour}:${arrivalMinute}`
    });
  }
  deleteRouteSetup(_id) { 
      this.setState({
          deleteRouteModal: !this.state.deleteRouteModal,
          deleteRouteID: _id
      })
  }
  //DELETE Route
  deleteRoute(_id){
  axios.delete('/routes/' + _id).then((response)=>{
      this._refreshRoutes();
    })
  if (this.state.deleteRouteModal) {
      this.setState({
          deleteRouteModal: !this.state.deleteRouteModal,
          deleteRouteID: 0
      })
  }
  }
  _refreshRoutes(){
    axios.get('/routes').then((response)=>{
      this.setState({
        routes:response.data
      })
    })
  }
  
  render(){
    let routes=this.state.routes.map((route)=>{
      return(
        <tr key={route._id}>
              <td>{route.name}</td>
              <td>{route.status}</td>
              <td>{getWeekDay(route.day)}</td>
              <td>{DateTime.fromObject({hour: route.departureHour, minute: route.departureMinute}).toLocaleString(DateTime.TIME_SIMPLE)}</td>
              <td>{DateTime.fromObject({hour: route.arrivalHour, minute: route.arrivalMinute}).toLocaleString(DateTime.TIME_SIMPLE)}</td>
              <td>{currencySymbol}{route.fare}</td>
              <td>
                <Button color="btn btn-outline-success" size="sm" className="mr-2" onClick={this.editRoute.bind(this, route._id,route.name,  route.status, route.day, route.departureHour, route.departureMinute, route.arrivalHour,route.arrivalMinute, route.fare)} datatoggle="tooltip" dataplacement="top" title="Edit Route"><FaPencilAlt/></Button>
                <Button color="btn btn-outline-success" size="sm" className="mr-2" onClick={this.createException.bind(this, route._id,route.name, "Disruption", route.day, route.departureHour, route.departureMinute, route.arrivalHour,route.arrivalMinute, route.fare)} datatoggle="tooltip" dataplacement="top" title="Add Exception To Route"><FcAddRow/></Button>
                <Button color="btn btn-outline-danger" size="sm" onClick={this.deleteRouteSetup.bind(this, route._id)} datatoggle="tooltip" dataplacement="top" title="Delete Route"><FaTrashAlt/></Button>
              </td>
            </tr>
      )
    });
    return(
      <div className="App container">
        <h2>RAILWAY ADMIN PAGE - ROUTES</h2>
      {/* EDIT MODEL START */}

      <Modal isOpen={this.state.editRouteModal} toggle={this.toggleEditRouteModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditRouteModal.bind(this)}>Edit</ModalHeader>
        <ModalBody>

          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" value={this.state.editRouteData.name} onChange={(e)=>{
              let {editRouteData}=this.state;
              editRouteData.name=e.target.value;
              this.setState({editRouteData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input id="status" value={this.state.editRouteData.status} onChange={(e)=>{
              let {editRouteData}=this.state;
              editRouteData.status=e.target.value;
              this.setState({editRouteData})
            }}/>
          </FormGroup>
           <FormGroup>
            <Label for="day">Day</Label>
            <br />
            <select id="day" value={this.state.editRouteData.day} onChange={(e)=> {
                let {editRouteData}=this.state;
                editRouteData.day=e.target.value;
                this.setState({editRouteData});
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
            <Label for="departure">Departure</Label>
             <br/>
              <TimePicker
                id="departure"
                  onChange={(e) => {
                      let {departureDateTime}=this.state;
                      let {editRouteData}=this.state;
                      let [hours, minutes] = [0,0];
                      departureDateTime = e;
                      try{
                          [hours, minutes] = e.split(':');
                      } catch (err) {
                          [hours, minutes] = [0,0];
                      }
                      this.setState({departureDateTime});
                      editRouteData.departureHour=hours;
                      editRouteData.departureMinute=minutes;
                      this.setState({editRouteData});
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
                      let {editRouteData}=this.state;
                      let [hours, minutes] = [0,0];
                      arrivalDateTime = e;
                      try{
                          [hours, minutes] = e.split(':');
                      } catch (err) {
                          [hours, minutes] = [0,0];
                      }
                      this.setState({arrivalDateTime});
                      editRouteData.arrivalHour=hours;
                      editRouteData.arrivalMinute=minutes;
                      this.setState({editRouteData});
                  }}
                  value={this.state.arrivalDateTime}
              />
          </FormGroup>
          <FormGroup>
            <Label for="fare">Fare</Label>
            <Input id="fare" value={this.state.editRouteData.fare} onChange={(e)=>{
              let {editRouteData}=this.state;
              editRouteData.fare=e.target.value;
              this.setState({editRouteData})
            }}/>
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateRoute.bind(this)}>Update</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditRouteModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
        {/* NEW EXCEPTION */}
        <Modal isOpen={this.state.newExceptionModal} toggle={this.toggleNewExceptionModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewExceptionModal.bind(this)}>Add New Exception</ModalHeader>
        <ModalBody>

          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" value={this.state.newExceptionData.name} onChange={(e)=>{
              let {newExceptionData}=this.state;
              newExceptionData.name=e.target.value;
              this.setState({newExceptionData})
            }} readOnly/>
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input id="status" value={this.state.newExceptionData.status} onChange={(e)=>{
              let {newExceptionData}=this.state;
              newExceptionData.status=e.target.value;
              this.setState({newExceptionData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="day">Day</Label>
            <Input id="day" value={getWeekDay(this.state.newExceptionData.day)} onChange={(e)=>{
              let {newExceptionData}=this.state;
              newExceptionData.day=e.target.value;
              this.setState({newExceptionData})
            }} readOnly />
          </FormGroup>
          <FormGroup>
            <Label for="departure">Departure</Label>
             <br/>
              <TimePicker
                id="departure"
                  onChange={(e) => {
                      let {departureDateTime}=this.state;
                      let {newExceptionData}=this.state;
                      let [hours, minutes] = [0,0];
                      departureDateTime = e;
                      try{
                          [hours, minutes] = e.split(':');
                      } catch (err) {
                          [hours, minutes] = [0,0];
                      }
                      this.setState({departureDateTime});
                      newExceptionData.departureHour=hours;
                      newExceptionData.departureMinute=minutes;
                      this.setState({newExceptionData});
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
                      let {newExceptionData}=this.state;
                      let [hours, minutes] = [0,0];
                      arrivalDateTime = e;
                      try{
                          [hours, minutes] = e.split(':');
                      } catch (err) {
                          [hours, minutes] = [0,0];
                      }
                      this.setState({arrivalDateTime});
                      newExceptionData.arrivalHour=hours;
                      newExceptionData.arrivalMinute=minutes;
                      this.setState({newExceptionData});
                  }}
                  value={this.state.arrivalDateTime}
              />
          </FormGroup>
          <FormGroup>
            <Label for="fare">Fare</Label>
            <Input id="fare" value={this.state.newExceptionData.fare} onChange={(e)=>{
              let {newExceptionData}=this.state;
              newExceptionData.fare=e.target.value;
              this.setState({newExceptionData})
            }}/>
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addException.bind(this)}>ADD</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewExceptionModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
        
        <Modal isOpen={this.state.deleteRouteModal} toggle={this.toggleDeleteRouteModal.bind(this)}>
              <ModalHeader>
                  Warning: Delete Irreversible
              </ModalHeader>
              <ModalBody>
                  Are you sure you wish to delete this route?
              </ModalBody>
              <ModalFooter style={{justifyContent:'space-between'}}>
                  <Button color="danger" onClick={this.deleteRoute.bind(this, this.state.deleteRouteID)}>Yes, Delete</Button>{' '}
                  <Button color="primary" onClick={this.toggleDeleteRouteModal.bind(this)}>No</Button>
              </ModalFooter>
        </Modal>

        <AddRoute routes={this.addRoute.bind(this)}/>
        <Table>
          <thead>
            <tr>
             <th>Station Name</th>
             <th>Status</th>
             <th>Day</th>
             <th>Departure</th>
             <th>Arrival</th>
             <th>Fare</th>
            </tr>
          </thead>
          <tbody>
            {routes}
          </tbody>
        </Table>
      </div>
    )
  }
}
export default AdminRoutes;
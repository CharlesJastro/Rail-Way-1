import React,{Component}from 'react';
import axios from 'axios';
import {DateTime} from 'luxon';
import {Modal,ModalHeader, ModalBody,ModalFooter,Table,Button, Label, Input, FormGroup} from 'reactstrap';
import {getWeekDay} from '../utils/getWeekDay.js';
import TimePicker from 'react-time-picker';
class AdminRoutes extends Component{
  state={
    routes:[],
    dateTime: '',
    newRouteData:{
      name:'',
      status:'',
      day:'',
      departureHour:'',
      departureMinute:'',
      arrivalHour:'',
      arrivalMinute:'',
      fare:''
    },
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
    newRouteModal:false,
    editRouteModal:false,
    newExceptionModal:false
  }
  //GET THE DATA FROM API
  componentDidMount(){
    this._refreshRoutes();
  }
  toggleNewRouteModal(){
    this.setState({
      newRouteModal: !this.state.newRouteModal
    })
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
  // ADD/POST REQUEST
  addRoute(){
    axios.post('/routes', this.state.newRouteData).then((response)=>{
      let{ routes } = this.state;
      routes.push(response.data);
      this.setState({routes, newRouteModal:false, newRouteData:{
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
      newExceptionData:{routeId,name,status,day,departureHour,departureMinute,arrivalHour,arrivalMinute,fare}, newExceptionModal:! this.state.newExceptionModal
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
      editRouteData:{_id,name,status,day,departureHour,departureMinute,arrivalHour,arrivalMinute,fare}, editRouteModal:! this.state.editRouteModal
    });
  }
  //DELETE Route
  deleteRoute(_id){
  axios.delete('/routes/' + _id).then((response)=>{
      this._refreshRoutes();
    })
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
              <td>{route.fare}</td>
              <td>
                <Button color="success" size="sm" className="mr-2" onClick={this.editRoute.bind(this, route._id,route.name,  route.status, route.day, route.departureHour, route.departureMinute, route.arrivalHour,route.arrivalMinute, route.fare)}>Edit</Button>
                <Button color="success" size="sm" className="mr-2" onClick={this.createException.bind(this, route._id,route.name, "Disruption", route.day, route.departureHour, route.departureMinute, route.arrivalHour,route.arrivalMinute, route.fare)}>Add Exception</Button>
                <Button color="danger" size="sm" onClick={this.deleteRoute.bind(this, route._id)}>Delete</Button>
              </td>
            </tr>
      )
    });
    return(
      <div className="App container">
        <h2>RAILWAY ADMIN PAGE - ROUTES</h2>

<Button className="my-3" color="primary" onClick={this.toggleNewRouteModal.bind(this)}>Create</Button>
{/* POST MODEL START */}
      <Modal isOpen={this.state.newRouteModal} toggle={this.toggleNewRouteModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewRouteModal.bind(this)}>Add New Route</ModalHeader>
        <ModalBody>

          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" value={this.state.newRouteData.name} onChange={(e)=>{
              let {newRouteData}=this.state;
              newRouteData.name=e.target.value;
              this.setState({newRouteData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input id="status" value={this.state.newRouteData.status} onChange={(e)=>{
              let {newRouteData}=this.state;
              newRouteData.status=e.target.value;
              this.setState({newRouteData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="day">day</Label>
            <Input id="day" value={this.state.newRouteData.day} onChange={(e)=>{
              let {newRouteData}=this.state;
              newRouteData.day=e.target.value;
              this.setState({newRouteData})
            }}/>
          </FormGroup>
          <FormGroup>
             <Label for="departure">Departure</Label>
             <br/>
              <TimePicker
                id="departure"
                  onChange={(e) => {
                      let {dateTime}=this.state;
                      let {newRouteData}=this.state;
                      let [hours, minutes] = [0,0];
                      dateTime = e;
                      try{
                          [hours, minutes] = e.split(':');
                      } catch (err) {
                          [hours, minutes] = [0,0];
                      }
                      this.setState({dateTime});
                      newRouteData.departureHour=hours;
                      newRouteData.departureMinute=minutes;
                      this.setState({newRouteData});
                  }}
                  value={this.state.dateTime}
              />
          </FormGroup>
          <FormGroup>
            <Label for="departureHour">DepartureHour</Label>
            <Input id="departureHour" value={this.state.newRouteData.departureHour} onChange={(e)=>{
              let {newRouteData}=this.state;
              newRouteData.departureHour=e.target.value;
              this.setState({newRouteData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="departureMinute">DepartureMinute</Label>
            <Input id="departureMinute" value={this.state.newRouteData.departureMinute} onChange={(e)=>{
              let {newRouteData}=this.state;
              newRouteData.departureMinute=e.target.value;
              this.setState({newRouteData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="arrivalHour">ArrivalHour</Label>
            <Input id="arrivalHour" value={this.state.newRouteData.arrivalHour} onChange={(e)=>{
              let {newRouteData}=this.state;
              newRouteData.arrivalHour=e.target.value;
              this.setState({newRouteData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="arrivalMinute">ArrivalMinute</Label>
            <Input id="arrivalMinute" value={this.state.newRouteData.arrivalMinute} onChange={(e)=>{
              let {newRouteData}=this.state;
              newRouteData.arrivalMinute=e.target.value;
              this.setState({newRouteData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="fare">Fare</Label>
            <Input id="fare" value={this.state.newRouteData.fare} onChange={(e)=>{
              let {newRouteData}=this.state;
              newRouteData.fare=e.target.value;
              this.setState({newRouteData})
            }}/>
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addRoute.bind(this)}>ADD</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewRouteModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

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
            <Input id="day" value={this.state.editRouteData.day} onChange={(e)=>{
              let {editRouteData}=this.state;
              editRouteData.day=e.target.value;
              this.setState({editRouteData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="departureHour">DepartureHour</Label>
            <Input id="departureHour" value={this.state.editRouteData.departureHour} onChange={(e)=>{
              let {editRouteData}=this.state;
              editRouteData.departureHour=e.target.value;
              this.setState({editRouteData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="departureMinute">DepartureMinute</Label>
            <Input id="departureMinute" value={this.state.editRouteData.departureMinute} onChange={(e)=>{
              let {editRouteData}=this.state;
              editRouteData.departureMinute=e.target.value;
              this.setState({editRouteData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="arrivalHour">ArrivalHour</Label>
            <Input id="arrivalHour" value={this.state.editRouteData.arrivalHour} onChange={(e)=>{
              let {editRouteData}=this.state;
              editRouteData.arrivalHour=e.target.value;
              this.setState({editRouteData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="arrivalMinute">ArrivalMinute</Label>
            <Input id="arrivalMinute" value={this.state.editRouteData.arrivalMinute} onChange={(e)=>{
              let {editRouteData}=this.state;
              editRouteData.arrivalMinute=e.target.value;
              this.setState({editRouteData})
            }}/>
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
        
        <Modal isOpen={this.state.newExceptionModal} toggle={this.toggleNewExceptionModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewExceptionModal.bind(this)}>Add New Exception</ModalHeader>
        <ModalBody>

          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" value={this.state.newExceptionData.name} onChange={(e)=>{
              let {newExceptionData}=this.state;
              newExceptionData.name=e.target.value;
              this.setState({newExceptionData})
            }}/>
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
            <Label for="routeId">RouteID</Label>
            <Input id="routeId" value={this.state.newExceptionData.routeId} onChange={(e)=>{
              let {newExceptionData}=this.state;
              newExceptionData.routeId=e.target.value;
              this.setState({newExceptionData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="day">day</Label>
            <Input id="day" value={this.state.newExceptionData.day} onChange={(e)=>{
              let {newExceptionData}=this.state;
              newExceptionData.day=e.target.value;
              this.setState({newExceptionData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="departureHour">DepartureHour</Label>
            <Input id="departureHour" value={this.state.newExceptionData.departureHour} onChange={(e)=>{
              let {newExceptionData}=this.state;
              newExceptionData.departureHour=e.target.value;
              this.setState({newExceptionData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="departureMinute">DepartureMinute</Label>
            <Input id="departureMinute" value={this.state.newExceptionData.departureMinute} onChange={(e)=>{
              let {newExceptionData}=this.state;
              newExceptionData.departureMinute=e.target.value;
              this.setState({newExceptionData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="arrivalHour">ArrivalHour</Label>
            <Input id="arrivalHour" value={this.state.newExceptionData.arrivalHour} onChange={(e)=>{
              let {newExceptionData}=this.state;
              newExceptionData.arrivalHour=e.target.value;
              this.setState({newExceptionData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="arrivalMinute">ArrivalMinute</Label>
            <Input id="arrivalMinute" value={this.state.newExceptionData.arrivalMinute} onChange={(e)=>{
              let {newExceptionData}=this.state;
              newExceptionData.arrivalMinute=e.target.value;
              this.setState({newExceptionData})
            }}/>
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
import React,{Component}from 'react';
import axios from 'axios';
import {Modal,ModalHeader, ModalBody,ModalFooter,Table,Button, Label, Input, FormGroup} from 'reactstrap';
class AdminRoutes extends Component{
  state={
    routes:[],
    newRouteData:{
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
    editRouteData:{
      _id:'',
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
    editRouteModal:false
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
  // ADD/POST REQUEST
  addRoute(){
    axios.post('/routes', this.state.newRouteData).then((response)=>{
      let{ routes } = this.state;
      routes.push(response.data);
      this.setState({routes, newRouteModal:false, newRouteData:{
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
  //UPDATE OR EDIT
  updateRoute(){
    let{ routeId, name, status, day, departureHour, departureMinute, arrivalHour, arrivalMinute, fare}=this.state.editRouteData;
    axios.patch('/routes/' + this.state.editRouteData._id,{
      routeId, name, status, day, departureHour, departureMinute, arrivalHour, arrivalMinute, fare
    }).then((response)=>{
      this._refreshRoutes()
      this.setState({
        editRouteModal:false, editRouteData:{
      _id:'',
      routeId:'',
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
  editRoute(_id,routeId,name,status,day,departureHour,departureMinute,arrivalHour,arrivalMinute,fare){
    this.setState({
      editRouteData:{_id,routeId,name,status,day,departureHour,departureMinute,arrivalHour,arrivalMinute,fare}, editRouteModal:! this.state.editRouteModal
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
              <td>{route.routeId}</td>
              <td>{route.name}</td>
              <td>{route.status}</td>
              <td>{route.day}</td>
              <td>{route.departureHour}</td>
              <td>{route.departureMinute}</td>
              <td>{route.arrivalHour}</td>
              <td>{route.arrivalMinute}</td>
              <td>{route.fare}</td>
              <td>
                <Button color="success" size="sm" className="mr-2" onClick={this.editRoute.bind(this, route._id,route.routeId,route.name,  route.status, route.day, route.departureHour, route.departureMinute, route.arrivalHour,route.arrivalMinute, route.fare)}>Edit</Button>
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
            <Label for="routeId">RouteID</Label>
            <Input id="routeId" value={this.state.newRouteData.routeId} onChange={(e)=>{
              let {newRouteData}=this.state;
              newRouteData.routeId=e.target.value;
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
            <Label for="routeId">RouteID</Label>
            <Input id="routeId" value={this.state.editRouteData.routeId} onChange={(e)=>{
              let {editRouteData}=this.state;
              editRouteData.routeId=e.target.value;
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

        <Table>
          <thead>
            <tr>
              <th>Route ID</th>
              <th>Station Name</th>
              <th>Status</th>
              <th>Day</th>
              <th>Departure Hour</th>
              <th>Departure Minute</th>
              <th>Arrival Hour</th>
              <th>Arrival Minute</th>
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
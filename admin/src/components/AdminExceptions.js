import React,{Component}from 'react';
import axios from 'axios';
import {Modal,ModalHeader, ModalBody,ModalFooter,Table,Button, Label, Input, FormGroup} from 'reactstrap';
class AdminExceptions extends Component{
  state={
    exceptions:[],
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
    editExceptionData:{
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
    newExceptionModal:false,
    editExceptionModal:false
  }
  //GET THE DATA FROM API
  componentDidMount(){
    this._refreshExceptions();
  }
  toggleNewExceptionModal(){
    this.setState({
      newExceptionModal: !this.state.newExceptionModal
    })
  }
  toggleEditExceptionModal(){
    this.setState({
      editExceptionModal: !this.state.editExceptionModal
    })
  }
  // ADD/POST REQUEST
  addException(){
    axios.post('/exceptions', this.state.newExceptionData).then((response)=>{
      let{ exceptions } = this.state;
      exceptions.push(response.data);
      this.setState({exceptions, newExceptionModal:false, newExceptionData:{
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
  updateException(){
    let{ routeId, name, status, day, departureHour, departureMinute, arrivalHour, arrivalMinute, fare}=this.state.editExceptionData;
    axios.patch('/exceptions/' + this.state.editExceptionData._id,{
      routeId, name, status, day, departureHour, departureMinute, arrivalHour, arrivalMinute, fare
    }).then((response)=>{
      this._refreshExceptions()
      this.setState({
        editExceptionModal:false, editExceptionData:{
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
  editException(_id,routeId,name,status,day,departureHour,departureMinute,arrivalHour,arrivalMinute,fare){
    this.setState({
      editExceptionData:{_id,routeId,name,status,day,departureHour,departureMinute,arrivalHour,arrivalMinute,fare}, editExceptionModal:! this.state.editExceptionModal
    });
  }
  //DELETE EXCEPTION
  deleteException(_id){
  axios.delete('/exceptions/' + _id).then((response)=>{
      this._refreshExceptions();
    })
  }
  _refreshExceptions(){
    axios.get('/exceptions').then((response)=>{
      this.setState({
        exceptions:response.data
      })
    })
  }
  
  
  render(){
    let exceptions=this.state.exceptions.map((exception)=>{
      return(
        <tr key={exception._id}>
              <td>{exception.routeId}</td>
              <td>{exception.name}</td>
              <td>{exception.status}</td>
              <td>{exception.day}</td>
              <td>{exception.departureHour}</td>
              <td>{exception.departureMinute}</td>
              <td>{exception.arrivalHour}</td>
              <td>{exception.arrivalMinute}</td>
              <td>{exception.fare}</td>
              <td>
                <Button color="success" size="sm" className="mr-2" onClick={this.editException.bind(this, exception._id,exception.routeId,exception.name,  exception.status, exception.day, exception.departureHour, exception.departureMinute, exception.arrivalHour,exception.arrivalMinute, exception.fare)}>Edit</Button>
                <Button color="danger" size="sm" onClick={this.deleteException.bind(this, exception._id)}>Delete</Button>
              </td>
            </tr>
      )
    });
    return(
      <div className="App container">
        <h2>RAILWAY ADMIN PAGE</h2>

<Button className="my-3" color="primary" onClick={this.toggleNewExceptionModal.bind(this)}>Create</Button>
{/* POST MODEL START */}
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

      {/* EDIT MODEL START */}

      <Modal isOpen={this.state.editExceptionModal} toggle={this.toggleEditExceptionModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditExceptionModal.bind(this)}>Edit</ModalHeader>
        <ModalBody>

          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" value={this.state.editExceptionData.name} onChange={(e)=>{
              let {editExceptionData}=this.state;
              editExceptionData.name=e.target.value;
              this.setState({editExceptionData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input id="status" value={this.state.editExceptionData.status} onChange={(e)=>{
              let {editExceptionData}=this.state;
              editExceptionData.status=e.target.value;
              this.setState({editExceptionData})
            }}/>
          </FormGroup>
           <FormGroup>
            <Label for="day">Day</Label>
            <Input id="day" value={this.state.editExceptionData.day} onChange={(e)=>{
              let {editExceptionData}=this.state;
              editExceptionData.day=e.target.value;
              this.setState({editExceptionData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="routeId">RouteID</Label>
            <Input id="routeId" value={this.state.editExceptionData.routeId} onChange={(e)=>{
              let {editExceptionData}=this.state;
              editExceptionData.routeId=e.target.value;
              this.setState({editExceptionData})
            }}/>
          </FormGroup>
         
          <FormGroup>
            <Label for="departureHour">DepartureHour</Label>
            <Input id="departureHour" value={this.state.editExceptionData.departureHour} onChange={(e)=>{
              let {editExceptionData}=this.state;
              editExceptionData.departureHour=e.target.value;
              this.setState({editExceptionData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="departureMinute">DepartureMinute</Label>
            <Input id="departureMinute" value={this.state.editExceptionData.departureMinute} onChange={(e)=>{
              let {editExceptionData}=this.state;
              editExceptionData.departureMinute=e.target.value;
              this.setState({editExceptionData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="arrivalHour">ArrivalHour</Label>
            <Input id="arrivalHour" value={this.state.editExceptionData.arrivalHour} onChange={(e)=>{
              let {editExceptionData}=this.state;
              editExceptionData.arrivalHour=e.target.value;
              this.setState({editExceptionData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="arrivalMinute">ArrivalMinute</Label>
            <Input id="arrivalMinute" value={this.state.editExceptionData.arrivalMinute} onChange={(e)=>{
              let {editExceptionData}=this.state;
              editExceptionData.arrivalMinute=e.target.value;
              this.setState({editExceptionData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="fare">Fare</Label>
            <Input id="fare" value={this.state.editExceptionData.fare} onChange={(e)=>{
              let {editExceptionData}=this.state;
              editExceptionData.fare=e.target.value;
              this.setState({editExceptionData})
            }}/>
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateException.bind(this)}>Update</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditExceptionModal.bind(this)}>Cancel</Button>
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
            {exceptions}
          </tbody>
        </Table>
      </div>
    )
  }
}
export default AdminExceptions;
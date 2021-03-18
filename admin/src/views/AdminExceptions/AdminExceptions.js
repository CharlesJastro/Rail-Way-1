import React,{Component}from 'react';
import axios from 'axios';
//import Tippy from '@tippyjs/react';
import {FaTrashAlt} from 'react-icons/fa';
import {FaPencilAlt} from 'react-icons/fa';
import {DateTime} from 'luxon';
import {Modal,ModalHeader, ModalBody,ModalFooter,Table,Button, Label, Input, FormGroup} from 'reactstrap';
import {getWeekDay} from '../../utils/getWeekDay';
import TimePicker from 'react-time-picker';
import {currencySymbol} from '../../utils/currency';

class AdminExceptions extends Component{
  state={
    exceptions:[],
    departureDateTime: '',
    arrivalDateTime: '',
    editExceptionData:{
      _id:'',
      routeId:'',
      name:'',
      status:'',
      day:0,
      departureHour:'',
      departureMinute:'',
      arrivalHour:'',
      arrivalMinute:'',
      fare:''
    },
    editExceptionModal:false,
    deleteExceptionModal:false,
    deleteExceptionID: 0
  }
  //GET THE DATA FROM API
  componentDidMount(){
    this._refreshExceptions();
  }
  toggleEditExceptionModal(){
    this.setState({
      editExceptionModal: !this.state.editExceptionModal
    })
  }
  toggleDeleteExceptionModal(){
    this.setState({
      deleteExceptionModal: !this.state.deleteExceptionModal
    })
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
      editExceptionData:{_id,routeId,name,status,day,departureHour,departureMinute,arrivalHour,arrivalMinute,fare}, editExceptionModal:! this.state.editExceptionModal,
      departureDateTime: `${departureHour}:${departureMinute}`,
      arrivalDateTime: `${arrivalHour}:${arrivalMinute}`
    });
  }
  deleteExceptionSetup(_id) { 
      this.setState({
          deleteExceptionModal: !this.state.deleteExceptionModal,
          deleteExceptionID: _id
      })
  }
  //DELETE EXCEPTION
  deleteException(_id){
  axios.delete('/exceptions/' + _id).then((response)=>{
      this._refreshExceptions();
    })
  if (this.state.deleteExceptionModal) {
      this.setState({
          deleteExceptionModal: !this.state.deleteExceptionModal,
          deleteExceptionID: 0
      })
  }
  }
  _refreshExceptions(){
    axios.get('/exceptions').then((response)=>{
      this.setState({
        exceptions:response.data
      })
    })
  }
deleteAllExceptions() {
    axios.delete('/exceptions/all').then((response)=>{
      this._refreshExceptions();
    });
}
  
  render(){
    let exceptions=this.state.exceptions.map((exception)=>{
      return(
        <tr key={exception._id}>
              <td>{exception.name}</td>
              <td>{exception.status}</td>
              <td>{getWeekDay(exception.day)}</td>
              <td>{DateTime.fromObject({hour: exception.departureHour, minute: exception.departureMinute}).toLocaleString(DateTime.TIME_SIMPLE)}</td>
              <td>{DateTime.fromObject({hour: exception.arrivalHour, minute: exception.arrivalMinute}).toLocaleString(DateTime.TIME_SIMPLE)}</td>
              <td>{currencySymbol}{exception.fare}</td>
              <td>
                <Button color="btn btn-outline-success" size="sm" className="mr-2" onClick={this.editException.bind(this, exception._id,exception.routeId,exception.name,  exception.status, exception.day, exception.departureHour, exception.departureMinute, exception.arrivalHour,exception.arrivalMinute, exception.fare)} datatoggle="tooltip" dataplacement="top" title="Edit The Exception">
                  <FaPencilAlt/>
                </Button>
                <Button color="btn btn-outline-danger" size="sm" onClick={this.deleteExceptionSetup.bind(this, exception._id)} datatoggle="tooltip" dataplacement="top" title="Delete Exception">
                    <FaTrashAlt/>
                </Button>
                
              </td>
            </tr>
      )
    });
    return(
      <div className="App container" style={{minHeight:'90vh'}}>
        <h2>RAILWAY ADMIN PAGE - EXCEPTIONS</h2>
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
            }} readOnly/>
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
            <Label for="departure">Departure</Label>
             <br/>
              <TimePicker
                id="departure"
                  onChange={(e) => {
                      let {departureDateTime}=this.state;
                      let {editExceptionData}=this.state;
                      let [hours, minutes] = [0,0];
                      departureDateTime = e;
                      try{
                          [hours, minutes] = e.split(':');
                      } catch (err) {
                          [hours, minutes] = [0,0];
                      }
                      this.setState({departureDateTime});
                      editExceptionData.departureHour=hours;
                      editExceptionData.departureMinute=minutes;
                      this.setState({editExceptionData});
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
                      let {editExceptionData}=this.state;
                      let [hours, minutes] = [0,0];
                      arrivalDateTime = e;
                      try{
                          [hours, minutes] = e.split(':');
                      } catch (err) {
                          [hours, minutes] = [0,0];
                      }
                      this.setState({arrivalDateTime});
                      editExceptionData.arrivalHour=hours;
                      editExceptionData.arrivalMinute=minutes;
                      this.setState({editExceptionData});
                  }}
                  value={this.state.arrivalDateTime}
              />
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
        
        <Modal isOpen={this.state.deleteExceptionModal} toggle={this.toggleDeleteExceptionModal.bind(this)}>
              <ModalHeader>
                  Warning: Delete Irreversible
              </ModalHeader>
              <ModalBody>
                  Are you sure you wish to delete this exception?
              </ModalBody>
              <ModalFooter style={{justifyContent:'space-between'}}>
                  <Button color="danger" onClick={this.deleteException.bind(this, this.state.deleteExceptionID)}>Yes, Delete</Button>{' '}
                  <Button color="primary" onClick={this.toggleDeleteExceptionModal.bind(this)}>No</Button>
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
            {exceptions}
          </tbody>
        </Table>
        <Button color="danger" onClick={this.deleteAllExceptions.bind(this)}>Delete All Exceptions</Button>
      </div>
    )
  }
}
export default AdminExceptions;
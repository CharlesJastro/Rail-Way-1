import React,{Component}from 'react';
import axios from 'axios';
import {Modal,ModalHeader, ModalBody,ModalFooter,Table,Button, Label, Input, FormGroup} from 'reactstrap';
import {getUrgency} from '../../utils/getUrgency.js';
import {FaTrashAlt} from 'react-icons/fa';
import {FaPencilAlt} from 'react-icons/fa';
class AdminNotifications extends Component{
  state={
    notifications:[],
    newNotificationData:{ 
      title:'',
      urgency:'',
      message:'' 
    },
    editNotificationData:{
      _id:'',
      title:'',
      urgency:'',
      message:''
    },
    newNotificationModal:false,
    editNotificationModal:false,
    deleteNotificationModal: false,
    deleteNotificationID: 0
  }
  //GET THE DATA FROM API
  componentDidMount(){
    this._refreshNotifications();
  }
  toggleNewNotificationModal(){
    this.setState({
      newNotificationModal: !this.state.newNotificationModal
    })
  }
  toggleEditNotificationModal(){
    this.setState({
      editNotificationModal: !this.state.editNotificationModal
    })
  }
  toggleDeleteNotificationModal() {
      this.setState({
      deleteNotificationModal: !this.state.deleteNotificationModal
    })
  }
  // ADD/POST REQUEST
  addNotification(){
    axios.post('/notifications', this.state.newNotificationData).then((response)=>{
      let{ notifications } = this.state;
      notifications.push(response.data);
      this.setState({notifications, newNotificationModal:false, newNotificationData:{
        title:'',
        urgency:'',
        message:''
    }})
    });
  }
  //UPDATE OR EDIT
  updateNotification(){
    let{ title, urgency, message}=this.state.editNotificationData;
    axios.patch('/notifications/' + this.state.editNotificationData._id,{
      title, urgency, message,
    }).then((response)=>{
      this._refreshNotifications()
      this.setState({
        editNotificationModal:false, editNotificationData:{
      _id:'',
      title:'',
        urgency:'',
        message:''
        }
      })
     
    })
  }
  editNotification(_id,title,urgency,message){
    this.setState({
      editNotificationData:{_id,title, urgency, message}, editNotificationModal:! this.state.editNotificationModal
    });
  }
  deleteNotificationSetup(_id) { 
      this.setState({
          deleteNotificationModal: !this.state.deleteNotificationModal,
          deleteNotificationID: _id
      })
  }
  //DELETE Notification
  deleteNotification(_id){
  axios.delete('/notifications/' + _id).then((response)=>{
      this._refreshNotifications();
    })
  if (this.state.deleteNotificationModal) {
      this.setState({
          deleteNotificationModal: !this.state.deleteNotificationModal,
          deleteNotificationID: 0
      })
  }
  }
  _refreshNotifications(){
    axios.get('/notifications').then((response)=>{
      this.setState({
        notifications:response.data
      })
    })
  }
  
  
  render(){
    let notifications=this.state.notifications.map((notification)=>{
      return(
        <tr key={notification._id}>
              <td>{notification.title}</td>
              <td>{getUrgency(notification.urgency)}</td>
              <td>{notification.message}</td>
              <td>
                 <Button color="btn btn-outline-success" size="sm" className="mr-2" onClick={this.editNotification.bind(this, notification._id,notification.title,notification.urgency,notification.message)} datatoggle="tooltip" dataplacement="top" title="Edit Notification"><FaPencilAlt/></Button>
                <Button color="btn btn-outline-danger" size="sm" onClick={this.deleteNotificationSetup.bind(this, notification._id)} datatoggle="tooltip" dataplacement="top" title="Delete Notification"><FaTrashAlt/></Button>
              </td>
            </tr>
      )
    });
    return(
      <div className="App container" style={{minHeight:'90vh'}}>
        <h2>RAILWAY ADMIN PAGE</h2>
        
<Button className="my-3" color="primary" onClick={this.toggleNewNotificationModal.bind(this)}>Create</Button>
{/* POST MODEL START */}
      <Modal isOpen={this.state.newNotificationModal} toggle={this.toggleNewNotificationModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewNotificationModal.bind(this)}>Add New Notification</ModalHeader>
        <ModalBody>

          <FormGroup>
            <Label for="title">Title</Label>
            <Input id="title" value={this.state.newNotificationData.title} onChange={(e)=>{
              let {newNotificationData}=this.state;
              newNotificationData.title=e.target.value;
              this.setState({newNotificationData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="urgency">Urgency</Label>
            <br />
            <select id="urgency" value={this.state.newNotificationData.urgency} onChange={(e)=> {
                let {newNotificationData}=this.state;
                newNotificationData.urgency=e.target.value;
                this.setState({newNotificationData});
            }}>
                <option value='info'>Informational</option>
                <option value='alert'>Alert</option>
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="message">Message</Label>
            <Input id="message" value={this.state.newNotificationData.message} onChange={(e)=>{
              let {newNotificationData}=this.state;
              newNotificationData.message=e.target.value;
              this.setState({newNotificationData})
          
            }}/>
        
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addNotification.bind(this)}>ADD</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewNotificationModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* EDIT MODEL START */}

      <Modal isOpen={this.state.editNotificationModal} toggle={this.toggleEditNotificationModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditNotificationModal.bind(this)}>Edit</ModalHeader>
        <ModalBody>

          <FormGroup>
            <Label for="title">Title</Label>
            <Input id="title" value={this.state.editNotificationData.title} onChange={(e)=>{
              let {editNotificationData}=this.state;
              editNotificationData.title=e.target.value;
              this.setState({editNotificationData})
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="urgency">Urgency</Label>
            <br />
            <select id="urgency" value={this.state.editNotificationData.urgency} onChange={(e)=> {
                let {editNotificationData}=this.state;
                editNotificationData.urgency=e.target.value;
                this.setState({editNotificationData});
            }}>
                <option value='info'>Informational</option>
                <option value='alert'>Alert</option>
            </select>
          </FormGroup>
           <FormGroup>
            <Label for="message">Message</Label>
            <Input id="message" value={this.state.editNotificationData.message} onChange={(e)=>{
              let {editNotificationData}=this.state;
              editNotificationData.message=e.target.value;
              this.setState({editNotificationData})
           
            }}/>
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateNotification.bind(this)}>Update</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditNotificationModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
        
        <Modal isOpen={this.state.deleteNotificationModal} toggle={this.toggleDeleteNotificationModal.bind(this)}>
              <ModalHeader>
                  Warning: Delete Irreversible
              </ModalHeader>
              <ModalBody>
                  Are you sure you wish to delete this route?
              </ModalBody>
              <ModalFooter style={{justifyContent:'space-between'}}>
                  <Button color="danger" onClick={this.deleteNotification.bind(this, this.state.deleteNotificationID)}>Yes, Delete</Button>{' '}
                  <Button color="primary" onClick={this.toggleDeleteNotificationModal.bind(this)}>No</Button>
              </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Urgency</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {notifications}
          </tbody>
        </Table>
      </div>
    )
  }
}
export default AdminNotifications;
import React,{Component}from 'react';
import axios from 'axios';
import {Modal,ModalHeader, ModalBody,ModalFooter,Table,Button, Label, Input, FormGroup} from 'reactstrap';
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
    editNotificationModal:false
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
  //DELETE Notification
  deleteNotification(_id){
  axios.delete('/notifications/' + _id).then((response)=>{
      this._refreshNotifications();
    })
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
              <td>{notification.urgency}</td>
              <td>{notification.message}</td>
              
              <td>
 <Button color="success" size="sm" className="mr-2" onClick={this.editNotification.bind(this, notification._id,notification.title,notification.urgency,notification.message)}>Edit</Button>
                <Button color="danger" size="sm" onClick={this.deleteNotification.bind(this, notification._id)}>Delete</Button>
              </td>
            </tr>
      )
    });
    return(
      <div className="App container">
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
            <Input id="urgency" value={this.state.newNotificationData.urgency} onChange={(e)=>{
              let {newNotificationData}=this.state;
              newNotificationData.urgency=e.target.value;
              this.setState({newNotificationData})
            }}/>
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
            <Input id="urgency" value={this.state.editNotificationData.status} onChange={(e)=>{
              let {editNotificationData}=this.state;
              editNotificationData.urgency=e.target.value;
              this.setState({editNotificationData})
            }}/>
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

        <Table>
          <thead>
            <tr>
              <th>Route ID</th>
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
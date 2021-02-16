import React from 'react';
import axios from 'axios';
import {DateTime} from 'luxon';
import {getWeekDay} from '../utils/getWeekDay.js';
import TimePicker from 'react-time-picker';
import {Modal,ModalHeader, ModalBody,ModalFooter,Table,Button, Label, Input, FormGroup} from 'reactstrap';

const AddRoute = (props) => {
    const [routeName, setRouteName] = React.useState('');
    const [routeStatus, setRouteStatus] = React.useState('On Time');
    const [routeDay, setRouteDay] = React.useState(0);
    const [routeDepartureHour, setRouteDepartureHour] = React.useState(0);
    const [routeDepartureMinute, setRouteDepartureMinute] = React.useState(0);
    const [routeArrivalHour, setRouteArrivalHour] = React.useState(0);
    const [routeArrivalMinute, setRouteArrivalMinute] = React.useState(0);
    const [routeFare, setRouteFare] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);
    const [departureDateTime, setDepartureDateTime] = React.useState('');
    const [arrivalDateTime, setArrivalDateTime] = React.useState('');
    
    React.useEffect(() => {
        if(!openModal) {
            resetForm();
        }
    }, [openModal]);
    
    function toggleModal() {
        setOpenModal(!openModal);
    }
    
    function addRoute() {
        const newRouteData = {
            name: routeName,
            status: routeStatus,
            day: routeDay,
            departureHour: routeDepartureHour,
            departureMinute: routeDepartureMinute,
            arrivalHour: routeArrivalHour,
            arrivalMinute: routeArrivalMinute,
            fare: routeFare
        }
        axios.post('/routes', newRouteData).then((response)=>{
            props.routes(response.data);
        });
        setOpenModal(false);
    }
    
    function resetForm() {
        setRouteName('');
        setRouteStatus('On Time');
        setRouteDay(0);
        setRouteDepartureHour(0);
        setRouteDepartureMinute(0);
        setRouteArrivalHour(0);
        setRouteArrivalMinute(0);
        setRouteFare('');
    }
    
    return (
        <>
        <Button className="my-3" color="primary" onClick={toggleModal}>Create</Button>
        <Modal isOpen={openModal} toggle={toggleModal}>
           <ModalHeader toggle={toggleModal}>Add New Route</ModalHeader>
              <ModalBody>
                  <FormGroup>
                      <Label for="name">Name</Label>
                      <Input id="name" value={routeName} onChange={(e)=>{
                              setRouteName(e.target.value);
                      }}/>
                  </FormGroup>
                  <FormGroup>
                      <Label for="status">Status</Label>
                      <Input id="status" value={routeStatus} onChange={(e)=>{
                              setRouteStatus(e.target.value);
                      }}/>
                  </FormGroup>
                  <FormGroup>
                      <Label for="day">Day</Label>
                      <br />
                      <select id="day" value={routeDay} onChange={(e)=>{
                              setRouteDay(e.target.value);
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
                      <br />
                      <TimePicker id="departure" value={departureDateTime} onChange={(e)=>{
                              let [hours, minutes] = [0, 0];
                              try {
                                  [hours, minutes] = e.split(':');
                              } catch (err) {
                                  [hours, minutes] = [0, 0];
                              }
                              setDepartureDateTime(e);
                              setRouteDepartureHour(hours);
                              setRouteDepartureMinute(minutes);
                      }}/>
                  </FormGroup>
                  <FormGroup>
                      <Label for="arrival">Arrival</Label>
                      <br />
                      <TimePicker id="arrival" value={arrivalDateTime} onChange={(e)=>{
                              let [hours, minutes] = [0, 0];
                              try {
                                  [hours, minutes] = e.split(':');
                              } catch (err) {
                                  [hours, minutes] = [0, 0];
                              }
                              setArrivalDateTime(e);
                              setRouteArrivalHour(hours);
                              setRouteArrivalMinute(minutes);
                      }}/>
                  </FormGroup>
                  <FormGroup>
                      <Label for="fare">Fare</Label>
                      <Input id="fare" value={routeFare} onChange={(e)=>{
                              setRouteFare(e.target.value);
                      }}/>
                  </FormGroup>
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={addRoute}>ADD</Button>{' '}
                  <Button color="secondary" onClick={toggleModal}>Cancel</Button>
              </ModalFooter>
        </Modal>
        </>
    );
}

export default AddRoute;
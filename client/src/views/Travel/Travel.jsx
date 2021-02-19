import React, { Component } from 'react';
//import GoogleMap from '../../components/GoogleMap';
import { Button, Icon, Modal, Form, Input} from 'semantic-ui-react';
import { useState } from 'react';
import axios from 'axios';
import {DateTime} from 'luxon';
import TimePicker from 'react-time-picker';
import styleReset from './styleReset.css';
import {getWeekDay} from '../../utils/getWeekDay';

let flag = false;
let path = [];

const Travel = () => {
    const [uniqueStationList, setUniqueStationList] = React.useState([]);
    const [day, setDay] = React.useState(DateTime.fromJSDate(new Date()).weekday);
    const [time, setTime] = React.useState('00:00');
    const [timeHour, setTimeHour] = React.useState();
    const [timeMinute, setTimeMinute] = React.useState();
    const [fromStation, setFromStation] = React.useState('Station');
    const [toStation, setToStation] = React.useState('Station');
    const [dateOption, setDateOption] = React.useState(0);
    const [openToModal, setOpenToModal] = React.useState(false);
    const [openFromModal, setOpenFromModal] = React.useState(false);
    const [openDateModal, setOpenDateModal] = React.useState(false);
    const [trip, setTrip] = React.useState(false);
    const [status, setStatus] = React.useState(0);
    
    React.useEffect(() => {
        async function fetchData () {
            let data;
            try {
                data = await axios
                    .get('/stations/list/')
                setUniqueStationList(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        resetTime();
    }, []);
    
    React.useEffect(() => {
        console.log(trip);
    }, [trip]);
    
    function resetForm() {
        setStatus(0);
        setTrip([]);
        setDay(DateTime.fromJSDate(new Date()).weekday);
        setFromStation('station');
        setToStation('station');
        resetTime();
    }
    
    function resetTime() {
        let dt = DateTime.fromJSDate(new Date());
        setTime(`${dt.hour}:${dt.minute}`);
        setTimeHour(dt.hour);
        setTimeMinute(dt.minute);
    }
    
    function showList(type) {
        try {
            if (type === 'from') {
                return (
                    uniqueStationList.map((station, index) => (
                        <div key={station+index}>
                            <Button 
                               onClick={() => [setFromStation(station), setOpenFromModal(false)]}
                            >
                                {station}
                            </Button>
                            <br /> <br/>
                        </div>
                    ))
                );
            } else {
                return (
                    uniqueStationList.map((station, index) => (
                        <div key={station+index}>
                            <Button 
                               onClick={() => [setToStation(station), setOpenToModal(false)]}
                            >
                                {station}
                            </Button>
                            <br /> <br/>
                        </div>
                    ))
                );
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    
    async function getTrip() {
        let data;
        try {
            data = await axios
                .get('/stations/')
        } catch (error) {
            console.log(error);
        }
        let x = data.data.filter((station) => {
            return (station.day === Number(day)) && (DateTime.fromObject({hour: station.departureHour, minute: station.departureMinute}) > DateTime.fromObject({hour: timeHour, minute: timeMinute})); 
        }).sort((a,b) => a.departureHour-b.departureHour || a.departureMinute-b.departureMinute);
        myFunc(fromStation, x, timeHour, timeMinute);
        console.log(path);
        setTrip(path);
        setStatus(1);
        flag = false;
        path = [];
    }
    
    function myFunc(stationA, stationList, hour, minute) {
        let stationAList = stationList.filter((station) => {
            return station.startingStation === stationA;
        });
        stationAList = stationAList.filter((station) => {
            return (DateTime.fromObject({hour: station.departureHour, minute: station.departureMinute}) > DateTime.fromObject({hour: hour, minute: minute})); 
        });
        let updatedStationList = stationList.filter((station) => {
            return !stationAList.includes(station); 
        });
        updatedStationList = updatedStationList.filter((station) => {
            return (DateTime.fromObject({hour: station.departureHour, minute: station.departureMinute}) > DateTime.fromObject({hour: hour, minute: minute}));
        });
        console.log(updatedStationList);
        for (let i = 0; i < stationAList.length-1; i++) {
            path.push(stationAList[i]);
            if (stationAList[i].endingStation === toStation) {
                console.log('Done');
                console.log(stationAList[i]);
                flag = true;
                break;
            } else {
                console.log('Continue');
                console.log(stationAList[i]);
                myFunc(stationAList[i].endingStation, updatedStationList, stationAList[i].arrivalHour, stationAList[i].arrivalMinute);
                console.log(flag);
                if (flag) {
                    break;
                }
            }
            path.pop();
        }
        return path;
    }
    if (!status) {
        return (
            <div>
                <h3>Travel View</h3>
                <Modal
                    open={openFromModal}
                    trigger={<Button >From: {fromStation}</Button>}
                    onClose={() => setOpenFromModal(false)}
                    onOpen={() => setOpenFromModal(true)}
                >
                    <Modal.Header>Select Station</Modal.Header>
                    <Modal.Content>
                        {showList('from')}
                    </Modal.Content>
                </Modal>
                <hr />
                <Modal
                    open={openToModal}
                    trigger={<Button >To: {toStation}</Button>}
                    onClose={() => setOpenToModal(false)}
                    onOpen={() => setOpenToModal(true)}
                >
                    <Modal.Header>Select Station</Modal.Header>
                    <Modal.Content>
                        {showList('to')}
                    </Modal.Content>
                </Modal>
                <hr />
                <Modal
                    closeIcon
                    open={openDateModal}
                    trigger={<Button >Depart At: {getWeekDay(Number(day))} at {DateTime.fromObject({hours: timeHour, minutes: timeMinute}).toLocaleString(DateTime.TIME_SIMPLE)}</Button>}
                    onClose={() => setOpenDateModal(false)}
                    onOpen={() => setOpenDateModal(true)}
                >
                    <Modal.Header>Select Day and Time</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label htmlFor="day">Day</label>
                                <select id="day" value={day} onChange={(e) => {
                                    setDay(e.target.value);
                                }}>
                                    <option value={0}>Sunday</option>
                                    <option value={1}>Monday</option>
                                    <option value={2}>Tuesday</option>
                                    <option value={3}>Wednesday</option>
                                    <option value={4}>Thursday</option>
                                    <option value={5}>Friday</option>
                                    <option value={6}>Saturday</option>
                                </select>
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="time">Time</label>
                                <TimePicker 
                                   style={styleReset} 
                                   id="time" 
                                   value={time} 
                                   onChange={(e)=>{
                                        console.log(e);
                                        let [hours, minutes] = [0,0];
                                        try {
                                            [hours, minutes] = e.split(':');

                                        } catch (err) {
                                            [hours, minutes] = [0,0];
                                        }
                                        setTime(e);
                                        setTimeHour(hours);
                                        setTimeMinute(minutes);
                                    }}
                                />
                                <br />
                                <br />
                                <Button primary onClick={()=>setOpenDateModal(false)}>Confirm</Button>
                                <Button secondary onClick={()=>[setDay(DateTime.fromJSDate(new Date()).weekday), resetTime()]}>Reset</Button>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                </Modal>
                <hr />
                <Button animated onClick={(getTrip)}>
                  <Button.Content visible>Find</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow down' />
                  </Button.Content>
                </Button>
            </div> 
        );
    } else {
        if (trip.length > 0) {
            return (
                <div>
                    <h3>Travel View</h3>
                    <h4>From: {fromStation}</h4>
                    <h4>To: {toStation}</h4>
                    <p>Departing At: {getWeekDay(Number(day))}, {DateTime.fromObject({hours: timeHour, minutes: timeMinute}).toLocaleString(DateTime.TIME_SIMPLE)}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Departing</th>
                                <th>Arriving</th>
                                <th>Duration</th>
                                <th>Fare</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trip.map((station, index) => (
                                <tr key={station._id}>
                                   {console.log(DateTime.fromObject({hour: station.arrivalHour, minute: station.arrivalMinute}).diff(DateTime.fromObject({hour: station.departureHour, minute: station.departureMinute}), ['hours', 'minutes']).toObject())}
                                    <td>{station.startingStation} {DateTime.fromObject({hour: station.departureHour, minute: station.departureMinute}).toLocaleString(DateTime.TIME_SIMPLE)}</td>
                                    <td>{station.endingStation} {DateTime.fromObject({hour: station.arrivalHour, minute: station.arrivalMinute}).toLocaleString(DateTime.TIME_SIMPLE)}</td>
                                    <td>{DateTime.fromObject({hour: station.arrivalHour, minute: station.arrivalMinute}).diff(DateTime.fromObject({hour: station.departureHour, minute: station.departureMinute}), ['hours', 'minutes']).toObject().hours}hr {DateTime.fromObject({hour: station.arrivalHour, minute: station.arrivalMinute}).diff(DateTime.fromObject({hour: station.departureHour, minute: station.departureMinute}), ['hours', 'minutes']).toObject().minutes}min </td>
                                    <td>{station.fare}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                    <Button onClick={resetForm}>Plan Another Trip</Button>
                </div>
            );
        } else {
            return (
                <div>
                    <h3>Travel View</h3>
                    <h4>From: {fromStation}</h4>
                    <h4>To: {toStation}</h4>
                    <p>Departing At: {getWeekDay(Number(day))}, {DateTime.fromObject({hours: timeHour, minutes: timeMinute}).toLocaleString(DateTime.TIME_SIMPLE)}</p>
                    <p>I'm sorry, but this trip is not possible at this time and day. Please pick another time, day or select different stations</p>
                    <br />
                    <Button onClick={resetForm}>Plan Another Trip</Button>
                </div>
            );
        }
    }
        
};

export default Travel;

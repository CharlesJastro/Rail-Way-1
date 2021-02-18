import React, { Component } from 'react';
import { TravelStations } from './TravelStations';
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
    const [time, setTime] = React.useState(DateTime.fromJSDate(new Date()));
    const [timeHour, setTimeHour] = React.useState();
    const [timeMinute, setTimeMinute] = React.useState();
    const [fromStation, setFromStation] = React.useState('Station');
    const [toStation, setToStation] = React.useState('Station');
    const [dateOption, setDateOption] = React.useState(0);
    const [openToModal, setOpenToModal] = React.useState(false);
    const [openFromModal, setOpenFromModal] = React.useState(false);
    const [openDateModal, setOpenDateModal] = React.useState(false);
    
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
        setTime(time.toLocaleString(DateTime.TIME_24_SIMPLE));
        fetchData();
    }, []);
    
    React.useEffect(() => {
        console.log(day);
        console.log(time);
    }, [day, time])
    
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
            return (station.day === Number(day)); 
        }).sort((a,b) => a.departureHour-b.departureHour || a.departureMinute-b.departureMinute);
        myFunc(fromStation, x);
        console.log(path);
    }
    
    function myFunc(stationA, stationList) {
        let stationAList = stationList.filter((station) => {
            return station.startingStation === stationA;
        });
        let updatedStationList = stationList.filter((station) => {
            return !stationAList.includes(station); 
        });
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
                myFunc(stationAList[i].endingStation, updatedStationList);
                console.log(flag);
                if (flag) {
                    break;
                }
            }
            path.pop();
        }
        return path;
    }

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
                trigger={<Button >Depart At: {getWeekDay(Number(day))} at {time.toLocaleString(DateTime.TIME_SIMPLE)}</Button>}
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
                            <TimePicker style={styleReset} id="time" value={time} onChange={(e)=>{
                                //setTime(DateTime.fromISO(e));
                                setTime(e);
                            }}/>
                            <br />
                            <br />
                            <Button primary onClick={()=>setOpenDateModal(false)}>Confirm</Button>
                            <Button secondary onClick={()=>[setDay(DateTime.fromJSDate(new Date()).weekday), setTime(DateTime.fromJSDate(new Date()).toLocaleString(DateTime.TIME_24_SIMPLE))]}>Reset</Button>
                        </Form.Field>
                    </Form>
                </Modal.Content>
            </Modal>
            <hr />
            <Button animated onClick={getTrip}>
              <Button.Content visible>Find</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow down' />
              </Button.Content>
            </Button>
            
            
            
        </div> 
    );

};

export default Travel;

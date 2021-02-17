import React, { Component } from 'react';
import { TravelStations } from './TravelStations';
//import GoogleMap from '../../components/GoogleMap';
import { Button, Icon, Modal, Form, Input} from 'semantic-ui-react';
import { useState } from 'react';
import axios from 'axios';
import {DateTime} from 'luxon';
import TimePicker from 'react-time-picker';
import styleReset from './styleReset.css';

const Travel = () => {
    const [uniqueStationList, setUniqueStationList] = React.useState([]);
    const [day, setDay] = React.useState(DateTime.fromJSDate(new Date()).toLocaleString({weekday: 'long'}));
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
        let dt = DateTime.fromJSDate(new Date());
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
                trigger={<Button >Depart At: {day} at {time.toLocaleString(DateTime.TIME_SIMPLE)}</Button>}
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
                                <option value={'Sunday'}>Sunday</option>
                                <option value={'Monday'}>Monday</option>
                                <option value={'Tuesday'}>Tuesday</option>
                                <option value={'Wednesday'}>Wednesday</option>
                                <option value={'Thursday'}>Thursday</option>
                                <option value={'Friday'}>Friday</option>
                                <option value={'Saturday'}>Saturday</option>
                            </select>
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="time">Time</label>
                            <TimePicker style={styleReset} id="time" value={time.toLocaleString(DateTime.TIME_24_SIMPLE)} onChange={(e)=>{
                                setTime(DateTime.fromISO(e));
                            }}/>
                            <br />
                            <br />
                            <Button primary onClick={()=>setOpenDateModal(false)}>Confirm</Button>
                            <Button secondary onClick={()=>[setDay(DateTime.fromJSDate(new Date()).toLocaleString({weekday: 'long'})), setTime(DateTime.fromJSDate(new Date()))]}>Reset</Button>
                        </Form.Field>
                    </Form>
                </Modal.Content>
            </Modal>
            <hr />
            <Button animated>
              <Button.Content visible>Find</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow down' />
              </Button.Content>
            </Button>
            
            
            
        </div> 
    );

};

export default Travel;

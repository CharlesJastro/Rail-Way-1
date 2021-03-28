import React, { Component } from 'react';
//import GoogleMap from '../../components/GoogleMap';
import { Button, Icon, Modal, Form, Input, Image } from 'semantic-ui-react';
import { useState } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import TimePicker from 'react-time-picker';
import styleReset from './styleReset.css';
import './star.css';
import { getWeekDay } from '../../utils/getWeekDay';

const Travel = () => {
    const [uniqueStationList, setUniqueStationList] = React.useState([]);
    const [day, setDay] = React.useState(new Date().getDay());
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
    const savedList = JSON.parse(localStorage.getItem('savedList'));
    const [favouriteStations, setFavouriteStations] = React.useState(savedList || ['Rigasa']);
    const [favouriteToggle, setFavouriteToggle] = React.useState(false);

    React.useEffect(() => {
        async function fetchData() {
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

    function resetForm() {
        setStatus(0);
        setTrip([]);
        setDay(new Date().getDay());
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

    React.useEffect(() => {
        localStorage.setItem('savedList', JSON.stringify(favouriteStations));
    }, [favouriteStations]);

    function updateFavourites(station) {
        if (favouriteStations.includes(station)) {
            setFavouriteStations(favouriteStations.filter(name => name !== station));
        } else {
            setFavouriteStations(arr => [...arr, station]);
        }
    }

    function showList(type) {
        try {
            if (type === 'from') {
                if (!favouriteToggle) {
                    return (
                        uniqueStationList.map((station, index) => (
                            <div key={station + index}>
                                 {/* <Button.Group fluid> */}
                                    <Button 
                                        onClick={() => [setFromStation(station), setOpenFromModal(false), setFavouriteToggle(false)]}
                                    >
                                        {station}
                                    </Button>

                                    <Image className="starSize"  src={favouriteStations.includes(station) ? 'star1.png' : 'star.png'} size='mini' onClick={() => updateFavourites(station)} />
                                {/* </Button.Group> */}
                                <br /><br />
                            </div>
                        ))
                    );
                } else {
                    if (favouriteStations.length === 0) {
                        return (
                            <p>No item on Favourites Stations</p>
                        )
                    } else {
                        return (
                            favouriteStations.map((station, index) => (
                                <div key={station + index}>
                                    {/* <Button.Group fluid> */}
                                        <Button 
                                            onClick={() => [setFromStation(station), setOpenFromModal(false), setFavouriteToggle(false)]}
                                        >
                                            {station}
                                        </Button>

                                        <Image  src={favouriteStations.includes(station) ? 'star1.png' : 'star.png'} size='mini' onClick={() => updateFavourites(station)} />
                                    {/* </Button.Group> */}
                                    <br /><br />
                                </div>
                            ))
                        );
                    }
                }
            } else {
                if (!favouriteToggle) {
                    return (
                        uniqueStationList.map((station, index) => (
                            <div key={station + index}>
                                {/* <Button.Group fluid> */}
                                    <Button 
                                        onClick={() => [setToStation(station), setOpenToModal(false), setFavouriteToggle(false)]}
                                    >
                                        {station}
                                    </Button>

                                    <Image  src={favouriteStations.includes(station) ? 'star1.png' : 'star.png'} size='mini' onClick={() => updateFavourites(station)} />
                                {/* </Button.Group> */}
                                <br /><br />
                            </div>
                        ))
                    );
                } else {
                    if (favouriteStations.length === 0) {
                        return (
                            <p>No item on Favourites Stations</p>
                        )
                    } else {
                        return (
                            favouriteStations.map((station, index) => (
                                <div key={station + index}>
                                    {/* <Button.Group fluid> */}
                                        <Button 
                                            onClick={() => [setToStation(station), setOpenToModal(false), setFavouriteToggle(false)]}
                                        >
                                            {station}
                                        </Button>

                                        <Image  src={favouriteStations.includes(station) ? 'star1.png' : 'star.png'} size='mini' onClick={() => updateFavourites(station)} />
                                    {/* </Button.Group> */}
                                    <br /><br />
                                </div>
                            ))
                        );
                    }
                }

            }

        } catch (error) {
            console.log(error);
        }
    }

    async function getTrip() {
        let data;
        try {
            data = await axios
                .get(`/stations/trip/from/${fromStation}/to/${toStation}/day/${Number(day)}/hour/${timeHour}/minute/${timeMinute}`)
        } catch (error) {
            console.log(error);
        }
        let path = data.data;
        setTrip(path);
        setStatus(1);
    }

    if (!status) {
        return (
            <div>
                <h2>Plan Trip</h2>
                <Modal style={{'width':'80%', 'height':'90%'}} 
                    open={openFromModal}
                    trigger={<Button fluid>From: {fromStation}</Button>}
                    onClose={() => [setOpenFromModal(false),setFavouriteToggle(false)]}
                    onOpen={() => setOpenFromModal(true)}
                >
                    <Modal.Header>Select Station</Modal.Header> <br />
                    <Button style={{'margin-bottom':'10px', 'margin-left':'15px', 'background-color':'springgreen'}} onClick={() => setFavouriteToggle(!favouriteToggle)}>{!favouriteToggle ? "Select from Favourites" : "Select from All"}</Button>
                    <Modal.Content>
                        {showList('from')}
                    </Modal.Content>
                </Modal>
                <hr />
                <Modal style={{'width':'80%', 'height':'90%'}}
                    open={openToModal}
                    trigger={<Button fluid>To: {toStation}</Button>}
                    onClose={() => [setOpenToModal(false),setFavouriteToggle(false)]}
                    onOpen={() => setOpenToModal(true)}
                >
                    <Modal.Header>Select Station</Modal.Header> <br/>
                    <Button style={{'margin-bottom':'10px', 'margin-left':'15px', 'background-color':'springgreen'}} onClick={() => setFavouriteToggle(!favouriteToggle)}>{!favouriteToggle ? "Select from Favourites" : "Select from All"}</Button>
                    <Modal.Content>
                        {showList('to')}
                    </Modal.Content>
                </Modal>
                <hr />
                <Modal
                    closeIcon
                    open={openDateModal}
                    trigger={<Button fluid>Depart On: {getWeekDay(Number(day))} at {DateTime.fromObject({ hours: timeHour, minutes: timeMinute }).toLocaleString(DateTime.TIME_SIMPLE)}</Button>}
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
                                    onChange={(e) => {
                                        let [hours, minutes] = [0, 0];
                                        try {
                                            [hours, minutes] = e.split(':');

                                        } catch (err) {
                                            [hours, minutes] = [0, 0];
                                        }
                                        setTime(e);
                                        setTimeHour(hours);
                                        setTimeMinute(minutes);
                                    }}
                                />
                                <br />
                                <br />
                                <Button primary onClick={() => setOpenDateModal(false)}>Confirm</Button>
                                <Button secondary onClick={() => [setDay(new Date().getDay()), resetTime()]}>Reset</Button>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                </Modal>
                <hr />
                <Button style={{'background-color':'springgreen'}} fluid animated='vertical' onClick={(getTrip)}>
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
                    <h2>Plan Trip</h2>
                    <h4>From: {fromStation}</h4>
                    <h4>To: {toStation}</h4>
                    <p>Departing On: {getWeekDay(Number(day))}, {DateTime.fromObject({ hours: timeHour, minutes: timeMinute }).toLocaleString(DateTime.TIME_SIMPLE)}</p>
                    <table style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Departing</th>
                                <th>Arriving</th>
                                <th>Duration</th>
                                <th>Fare*</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trip.map((station, index) => (
                                <tr key={station._id}>
                                    <td>{station.startingStation} {DateTime.fromObject({ hour: station.departureHour, minute: station.departureMinute }).toLocaleString(DateTime.TIME_SIMPLE)}</td>
                                    <td>{station.endingStation} {DateTime.fromObject({ hour: station.arrivalHour, minute: station.arrivalMinute }).toLocaleString(DateTime.TIME_SIMPLE)}</td>
                                    <td>{DateTime.fromObject({ hour: station.arrivalHour, minute: station.arrivalMinute }).diff(DateTime.fromObject({ hour: station.departureHour, minute: station.departureMinute }), ['hours', 'minutes']).toObject().hours}hr {DateTime.fromObject({ hour: station.arrivalHour, minute: station.arrivalMinute }).diff(DateTime.fromObject({ hour: station.departureHour, minute: station.departureMinute }), ['hours', 'minutes']).toObject().minutes}min </td>
                                    <td>{station.fare}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                    <p>* Fares are typically for an entire route. Please consult your ticket vendor for final fare</p>
                    <Button style={{'background-color':'springgreen'}} onClick={resetForm}>Plan Another Trip</Button>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>Plan Trip</h2>
                    <h4>From: {fromStation}</h4>
                    <h4>To: {toStation}</h4>
                    <p>Departing At: {getWeekDay(Number(day))}, {DateTime.fromObject({ hours: timeHour, minutes: timeMinute }).toLocaleString(DateTime.TIME_SIMPLE)}</p>
                    <p>I'm sorry, but this trip is not possible at this time and day. Please pick another time, day or select different stations</p>
                    <br />
                    <Button style={{'background-color':'springgreen'}} onClick={resetForm}>Plan Another Trip</Button>
                </div>
            );
        }
    }

};

export default Travel;

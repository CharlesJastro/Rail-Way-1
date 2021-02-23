import React, { Component } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import { TravelStations } from './TravelStations';
import Calendar from 'react-calendar'
//import GoogleMap from '../../components/GoogleMap';
import { Button, Icon } from 'semantic-ui-react'
import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';


// Modal Dialog function component to open stationList
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#root')


//Calender hide and show function component  
function MyApp(props) {
  const [value, onChange] = useState(new Date());
  console.log(value);

  if (props.status) {
    return (
      <div>
        <Calendar
          onChange={onChange}
          value={value}
        />
      </div>
    );
  }
  else {
    return (
      <div></div>
    )
  }
}


class Travel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      myCalender: new Date(),
      status: false,
      modalIsOpen: false,
      uniqueStationList: []
    }

    this.handleClick = this.handleClick.bind(this);
    this.openModal = this.openModal.bind(this);

  };

  handleClick() {
    this.setState(state => ({
      status: !state.status
    }));
  }

  openModal() {
    this.setState(state => ({
      modalIsOpen: !state.modalIsOpen
    }))
  }

  componentDidMount() {
    axios
      .get('/stations/list/')
      .then((response) => {
        this.setState(state => ({
          uniqueStationList: response.data
        }));
      })
  }

  render() {
    console.log(this.state.myCalender);
    console.log(this.state.uniqueStationList);
    return (
      <div>
        <h3>Travel View</h3>
        <Button onClick={this.openModal}>From:  Station</Button> <hr />
        <Button onClick={this.openModal}>To:  Station</Button> <hr />
        <Modal
          isOpen={this.state.modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button onClick={this.openModal}>X</button>
          <form>
            <h4>Choose Station</h4>
            {this.state.uniqueStationList.map((station) => (
              <div>{station}</div>
            ))}
          </form>
        </Modal>

        <Button onClick={this.handleClick}>Depart At:  Now</Button> <hr /> <br /><br /><br />

        <MyApp status={this.state.status} />

        <Button animated>
          <Button.Content visible>Find</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow down' />
          </Button.Content>
        </Button>
        <br /><br /><br /><br />
      </div>
    )
  }

};

export default Travel;


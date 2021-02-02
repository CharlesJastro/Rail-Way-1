import React from 'react';
import axios from 'axios';
import {DateTime} from 'luxon';
import RouteDetail from '../RouteDetail';

// const stations = [
//     {
//         name: 'Kaduna-Abuja',
//         day: 1,
//         code: 'KA1',
//         startingStation: 'Kubwa',
//         endingStation: 'Idu',
//         departureHour: 8,
//         departureMinute: 31,
//         arrivalHour: 8,
//         arrivalMinute: 43,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 1,
//         code: 'KA2',
//         startingStation: 'Rigasa',
//         endingStation: 'Kubwa',
//         departureHour: 10,
//         departureMinute: 35,
//         arrivalHour: 12,
//         arrivalMinute: 59,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 1,
//         code: 'KA1',
//         startingStation: 'Rigasa',
//         endingStation: 'Kubwa',
//         departureHour: 6,
//         departureMinute: 40,
//         arrivalHour: 8,
//         arrivalMinute: 28,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 1,
//         code: 'KA2',
//         startingStation: 'Kubwa',
//         endingStation: 'Idu',
//         departureHour: 13,
//         departureMinute: 4,
//         arrivalHour: 13,
//         arrivalMinute: 20,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 2,
//         code: 'KA1',
//         startingStation: 'Rigasa',
//         endingStation: 'Kubwa',
//         departureHour: 6,
//         departureMinute: 40,
//         arrivalHour: 8,
//         arrivalMinute: 28,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 2,
//         code: 'KA1',
//         startingStation: 'Kubwa',
//         endingStation: 'Idu',
//         departureHour: 8,
//         departureMinute: 31,
//         arrivalHour: 8,
//         arrivalMinute: 43,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 2,
//         code: 'KA2',
//         startingStation: 'Rigasa',
//         endingStation: 'Kubwa',
//         departureHour: 10,
//         departureMinute: 35,
//         arrivalHour: 12,
//         arrivalMinute: 59,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 2,
//         code: 'KA2',
//         startingStation: 'Kubwa',
//         endingStation: 'Idu',
//         departureHour: 13,
//         departureMinute: 4,
//         arrivalHour: 13,
//         arrivalMinute: 20,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 3,
//         code: 'KA1',
//         startingStation: 'Rigasa',
//         endingStation: 'Kubwa',
//         departureHour: 6,
//         departureMinute: 40,
//         arrivalHour: 8,
//         arrivalMinute: 28,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 3,
//         code: 'KA1',
//         startingStation: 'Kubwa',
//         endingStation: 'Idu',
//         departureHour: 8,
//         departureMinute: 31,
//         arrivalHour: 8,
//         arrivalMinute: 43,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 3,
//         code: 'KA2',
//         startingStation: 'Rigasa',
//         endingStation: 'Kubwa',
//         departureHour: 10,
//         departureMinute: 35,
//         arrivalHour: 12,
//         arrivalMinute: 59,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 3,
//         code: 'KA2',
//         startingStation: 'Kubwa',
//         endingStation: 'Idu',
//         departureHour: 13,
//         departureMinute: 4,
//         arrivalHour: 13,
//         arrivalMinute: 20,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 4,
//         code: 'KA1',
//         startingStation: 'Rigasa',
//         endingStation: 'Kubwa',
//         departureHour: 6,
//         departureMinute: 40,
//         arrivalHour: 8,
//         arrivalMinute: 28,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 4,
//         code: 'KA1',
//         startingStation: 'Kubwa',
//         endingStation: 'Idu',
//         departureHour: 8,
//         departureMinute: 31,
//         arrivalHour: 8,
//         arrivalMinute: 43,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 4,
//         code: 'KA2',
//         startingStation: 'Rigasa',
//         endingStation: 'Kubwa',
//         departureHour: 10,
//         departureMinute: 35,
//         arrivalHour: 12,
//         arrivalMinute: 59,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 4,
//         code: 'KA2',
//         startingStation: 'Kubwa',
//         endingStation: 'Idu',
//         departureHour: 13,
//         departureMinute: 4,
//         arrivalHour: 13,
//         arrivalMinute: 20,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 5,
//         code: 'KA1',
//         startingStation: 'Rigasa',
//         endingStation: 'Kubwa',
//         departureHour: 6,
//         departureMinute: 40,
//         arrivalHour: 8,
//         arrivalMinute: 28,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 5,
//         code: 'KA1',
//         startingStation: 'Kubwa',
//         endingStation: 'Idu',
//         departureHour: 8,
//         departureMinute: 31,
//         arrivalHour: 8,
//         arrivalMinute: 43,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 5,
//         code: 'KA2',
//         startingStation: 'Rigasa',
//         endingStation: 'Kubwa',
//         departureHour: 10,
//         departureMinute: 35,
//         arrivalHour: 12,
//         arrivalMinute: 59,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 5,
//         code: 'KA2',
//         startingStation: 'Kubwa',
//         endingStation: 'Idu',
//         departureHour: 13,
//         departureMinute: 4,
//         arrivalHour: 13,
//         arrivalMinute: 20,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 6,
//         code: 'KA1',
//         startingStation: 'Rigasa',
//         endingStation: 'Kubwa',
//         departureHour: 6,
//         departureMinute: 40,
//         arrivalHour: 8,
//         arrivalMinute: 28,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 6,
//         code: 'KA1',
//         startingStation: 'Kubwa',
//         endingStation: 'Idu',
//         departureHour: 8,
//         departureMinute: 31,
//         arrivalHour: 8,
//         arrivalMinute: 43,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 6,
//         code: 'KA2',
//         startingStation: 'Rigasa',
//         endingStation: 'Kubwa',
//         departureHour: 10,
//         departureMinute: 35,
//         arrivalHour: 12,
//         arrivalMinute: 59,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 6,
//         code: 'KA2',
//         startingStation: 'Kubwa',
//         endingStation: 'Idu',
//         departureHour: 13,
//         departureMinute: 4,
//         arrivalHour: 13,
//         arrivalMinute: 20,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 0,
//         code: 'KA2',
//         startingStation: 'Rigasa',
//         endingStation: 'Kubwa',
//         departureHour: 13,
//         departureMinute: 0,
//         arrivalHour: 14,
//         arrivalMinute: 49,
//         fare: 0
//     },
//     {
//         name: 'Kaduna-Abuja',
//         day: 0,
//         code: 'KA2',
//         startingStation: 'Kubwa',
//         endingStation: 'Idu',
//         departureHour: 14,
//         departureMinute: 54,
//         arrivalHour: 15,
//         arrivalMinute: 6,
//         fare: 0
//     },
// ];

const days = [0,1,2,3,4,5,6];

const RouteDetails = (props) => {
    const [routeName, setRouteName] = React.useState();
    const [routeList, setRouteList] = React.useState([]);
    
    React.useEffect(() => {
        setRouteName(props.match.params.name);
        
        async function fetchData (){
           let Data=await axios
           .get('/stations/')
           .then(function(response) {
               return response;
           }).catch(function(error) {
               console.log(error); 
           });
          try {
            setRouteList(Data.data) 
          }catch(error){}
        }
        fetchData()
      

    }, [props.match.params.name]);
    
    function getDay(day) {
        /* eslint-disable */
        switch(day) {
            case 0:
                return 'Sunday';
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
        }
        /* eslint-enable */
    }
    
    function getFunction(route) {
        if (route.length === 0){
            return (
                <p>No data</p>
            );
        } else {
            let stationList = route.map((item, index) => item.startingStation);
            let stationList2 = route.map((item, index) => item.endingStation);
            stationList = stationList.concat(stationList2);
            stationList = stationList.filter((value, index, self) => (
                self.indexOf(value) === index
            ));
            let codeList = route.map((item, index) => item.code);
            codeList = codeList.filter((value, index, self) => (
                self.indexOf(value) === index
            ));
            console.log(DateTime.fromObject({weekday:0}).toLocaleString());
            
            return (
                <table style={{width:"100%"}}>
                    <tbody>
                       <tr>
                          <th rowSpan="2">Code</th>
                            {stationList.map((item, index) => (
                                index > 0 && index < stationList.length-1 ? <th colSpan="2">{item}</th> :  <th>{item}</th>
                            ))}
                       </tr>
                       <tr>
                           {stationList.map((item, index) => (
                                index === 0 ? <td>Departure</td> : index === stationList.length-1 ? <td>Arrival</td> : [<td>Arrival</td>,<td>Departure</td>]
                            ))}
                       </tr>
                       {codeList.map((code) => (
                            <tr>
                                <td>{code}</td>
                                {route.filter((line) => line.code === code).map((item, index) => (
                                    [<td>{DateTime.fromObject({hour: item.departureHour, minute: item.departureMinute}).toLocaleString(DateTime.TIME_SIMPLE)}</td>,<td>{DateTime.fromObject({hour: item.arrivalHour, minute: item.arrivalMinute}).toLocaleString(DateTime.TIME_SIMPLE)}</td>]
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
    }
    
    return (
        <div>
            <h1>{routeName}</h1>
            {days.map((day) => (
                <div>
                    <h1>{getDay(day)}</h1>
                    {getFunction(routeList.filter((route) => route.name === routeName).filter((route) => route.day === day).sort((a, b) => a.departureHour-b.departureHour || a.departureMinute-b.departureMinute))}
                </div>
            ))}  
        </div>
    );
}

export default RouteDetails;
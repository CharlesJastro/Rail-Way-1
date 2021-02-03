import React from 'react';
import axios from 'axios';
import {DateTime} from 'luxon';
 
 // Create a react component
 const StationsTable = function (props) {
    console.log("Station Table is running");
    return (
        <table style={{width:"100%"}}>
            <tbody>
               <tr>
                  <th rowSpan="2">Code</th>
                    {props.stationList.map((item, index) => (
                        index > 0 && index < props.stationList.length-1 ? <th colSpan="2">{item}</th> :  <th>{item}</th>
                    ))}
               </tr>
               <tr>
                   {props.stationList.map((item, index) => (
                        index === 0 ? <td>Departure</td> : index === props.stationList.length-1 ? <td>Arrival</td> : [<td>Arrival</td>,<td>Departure</td>]
                    ))}
               </tr>
               {props.codeList.map((code) => (
                    <tr>
                        <td>{code}</td>
                        {props.route.filter((line) => line.code === code).map((item, index) => (
                            [<td>{DateTime.fromObject({hour: item.departureHour, minute: item.departureMinute}).toLocaleString(DateTime.TIME_SIMPLE)}</td>,<td>{DateTime.fromObject({hour: item.arrivalHour, minute: item.arrivalMinute}).toLocaleString(DateTime.TIME_SIMPLE)}</td>]
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default StationsTable;
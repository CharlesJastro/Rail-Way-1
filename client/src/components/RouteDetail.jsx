import React from 'react';
import {DateTime} from 'luxon';
import {ListSubItem} from './ListSubItem'

// Route event handler
const RouteDetail = ({data}) => {
    return (
            <tbody>
                <tr>
                    <th rowSpan="2">Code</th>
                    <th>{data.startingStation}</th>
                    <th>{data.endingStation}</th>
                    <th rowSpan="2">Fare</th>
                </tr>
                <tr>
                    <td>Departing</td>
                    <td>Arriving</td>
                </tr>
                <tr>
                    <ListSubItem data={data.code} />
                    <ListSubItem data={DateTime.fromObject({hour: data.departureHour, minute: data.departureMinute}).toLocaleString(DateTime.TIME_SIMPLE)} />
                    <ListSubItem data={DateTime.fromObject({hour: data.arrivalHour, minute: data.arrivalMinute}).toLocaleString(DateTime.TIME_SIMPLE)} />
                    <ListSubItem data={data.fare} />
                </tr>
            </tbody>
  );
}

export default RouteDetail;
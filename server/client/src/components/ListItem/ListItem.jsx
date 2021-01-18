import React from 'react';
import {ListSubItem} from '../ListSubItem';
//import {DateTime} from 'luxon';

const ListItem = ({id, data}) => {
    return (
        <tr id={id}>
            {data.map((x, index)=> (
                <ListSubItem key={index} data={x} />
            ))}
        </tr>
  );
}

export default ListItem;

/*<ListSubItem data={data.name}/>
                <ListSubItem data={DateTime.fromObject({hour: data.departureHour, minute: data.departureMinute}).toLocaleString(DateTime.TIME_SIMPLE)}/>
                <ListSubItem data={DateTime.fromObject({hour: data.arrivalHour, minute: data.arrivalMinute}).toLocaleString(DateTime.TIME_SIMPLE)}/>
                <ListSubItem data={data.fare}/>*/
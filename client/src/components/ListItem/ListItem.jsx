import React from 'react';
import {ListSubItem} from '../ListSubItem';

// Route event handler
const ListItem = ({id, data}) => {
    return (
        <tr id={id} className="routeRow" onClick={()=>window.location.href = "/route/" + data[0]}>
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
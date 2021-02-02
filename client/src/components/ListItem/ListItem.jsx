import React from 'react';
import {ListSubItem} from '../ListSubItem';

// Route event handler
const ListItem = ({id, className, data}) => {
    return (
        <tr id={id} className={`routeRow ${className}`} onClick={()=>window.location.href = "/route/" + data[0]}>
            {data.map((x, index)=> (
                <ListSubItem key={index} data={x} />
            ))}
        </tr>
  );
}

export default ListItem;
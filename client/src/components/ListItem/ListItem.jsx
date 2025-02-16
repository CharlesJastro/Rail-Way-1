import React from 'react';
import {ListSubItem} from '../ListSubItem';
import { Popup } from 'semantic-ui-react'

// Route event handler to see all station schedule
const ListItem = ({id, className, data}) => {
    return (
        <Popup
            trigger={<tr id={id} className={`routeRow ${className}`} onClick={()=>window.location.href = "/route/" + data[0]}>
                {data.map((x, index)=> (
                    <ListSubItem key={index + x} data={x} />
                ))}
            </tr>}
            content="Click for daily schedule"
        />
  );
}

export default ListItem;
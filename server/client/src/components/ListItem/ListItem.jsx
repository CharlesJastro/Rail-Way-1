import React from 'react';
import {ListSubItem} from '../ListSubItem';

const ListItem = ({data}) => {
    return (
        <tbody>
            <tr>
                <ListSubItem data={data.name}/>
                <ListSubItem data={data.departure}/>
                <ListSubItem data={data.arrival}/>
                <ListSubItem data={data.fare}/>
            </tr>
        </tbody>
  );
}

export default ListItem;
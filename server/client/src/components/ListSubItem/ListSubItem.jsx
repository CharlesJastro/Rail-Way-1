import React from 'react';

const ListSubItem = ({data}) => {
  function handleClick(){
    console.log(data);
  }
  return (
  
      <td onClick={handleClick}>{data}</td>

      
  );
}

export default ListSubItem;
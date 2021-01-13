import React from 'react';

const RoutesList = function (props) {
    return (
        <div className="ui container" >
            <h2>Routes List</h2>   
            <h3>{props.headingTrain} {props.headingDepart} {props.headingArrive} {props.headingFare}</h3>
            <div>{props.route} {props.departure} {props.arrival} {props.fare}</div>
        </div>
    );
};

export default RoutesList;





//    <div style={{ display: "flex", flexDirection: "column", alignContent: "center",  backgroundColor:"orange"}}>
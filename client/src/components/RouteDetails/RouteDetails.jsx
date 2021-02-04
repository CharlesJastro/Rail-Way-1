import React from 'react';
import axios from 'axios';
import {DateTime} from 'luxon';
import RouteDetail from '../RouteDetail';
import StationsTable from './StationsTable'; 


    // Display Station schedule for each day in rows

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
          
            
            return(
           <StationsTable stationList={stationList} codeList={codeList} route={route} />
            )
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
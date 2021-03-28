const {DateTime} = require('luxon');

let flag = false;
let path = [];

function tripPlanner(fromStation, list, hour, minute, toStation){
    recursiveFunc(fromStation, list, hour, minute, toStation);
    let finalPath = path;
    path = [];
    flag = false;
    return finalPath;
}

function recursiveFunc(fromStation, list, hour, minute, toStation){
    let stationAList = list.filter((station) => {
        return station.startingStation === fromStation;
    });
    stationAList = stationAList.filter((station) => {
        return (DateTime.fromObject({hour: station.departureHour, minute: station.departureMinute}) >= DateTime.fromObject({hour: hour, minute: minute})); 
    });
    let updatedStationList = list.filter((station) => {
        return !stationAList.includes(station); 
    });
    updatedStationList = updatedStationList.filter((station) => {
        return (DateTime.fromObject({hour: station.departureHour, minute: station.departureMinute}) >= DateTime.fromObject({hour: hour, minute: minute}));
    });
    console.log(updatedStationList);
    for (let i = 0; i <= stationAList.length-1; i++) {
        path.push(stationAList[i]);
        if (stationAList[i].endingStation === toStation) {
            console.log('Done');
            console.log(stationAList[i]);
            flag = true;
            break;
        } else {
            console.log('Continue');
            console.log(stationAList[i]);
            recursiveFunc(stationAList[i].endingStation, updatedStationList, stationAList[i].arrivalHour, stationAList[i].arrivalMinute, toStation);
            console.log(flag);
            if (flag) {
                break;
            }
        }
        path.pop();
    }
    return path;
}

module.exports=tripPlanner;
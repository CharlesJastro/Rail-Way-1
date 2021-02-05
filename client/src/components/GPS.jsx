import React from 'react';
import * as geolib from 'geolib';
import * as convertUnits from 'convert-units';

const Locations = [
    {
        name: "Rigasa",
        lat: 10.547749,
        lon: 7.355282
    },
    {
        name: "Kubwa",
        lat: 9.164864,
        lon: 7.32459
    },
    {
        name: "Idu",
        lat: 9.047027,
        lon: 7.3424506
    }
]

const GPS = () => {
    const [latLon, setLatLon] = React.useState(
        {
            lat: null,
            lon: null
        }
    );
    const [closest, setClosest] = React.useState();
    const [closestList, setClosestList] = React.useState([]);
    
    React.useEffect(() => {
        window.navigator.geolocation.getCurrentPosition(
            position => setLatLon({lat: position.coords.latitude, lon: position.coords.longitude}),
            err => console.log(err)
        );
        
        //setLatLon({lat: 8.375761625822282, lon: 6.296107050868811})
        //setLatLon({lat: 11.862524028583573, lon: 6.575773288478608})
    }, []);
    
    React.useEffect(() => {
        console.log(latLon);
        /*function closestLocation(targetLocation, locationData) {
            function vectorDistance(dx, dy) {
                return Math.sqrt(dx * dx + dy * dy);
            }
            
            function locationDistance(location1, location2) {
                let dx = location1.lat - location2.lat,
                    dy = location1.lon - location2.lon;
                return vectorDistance(dx, dy);
            }
            
            return locationData.reduce(function(prev, curr) {
                let prevDistance = locationDistance(targetLocation, prev),
                    currDistance = locationDistance(targetLocation, curr);
                return (prevDistance < currDistance) ? prev : curr;
            });
        }
        setClosest(closestLocation(latLon, Locations));*/
        if (latLon.lat !== null) {
            setClosestList(Locations.map((station) => {
                const coord = {lat: station.lat, lng: station.lon};
                return {station, dist: geolib.getDistance(latLon, coord)}
            }));
        }     
    }, [latLon]);
    
    React.useEffect(() => {
        console.log(closestList);
        if (closestList !== undefined) {
            setClosest(closestList.sort((a,b) => a.dist - b.dist)[0]);
        }
    }, [closestList]);
    
    function getClosest() {
        if (closest === undefined) {
            return <p>There is an error</p>
        } else {
            const distance = convertUnits(closest.dist).from('m').toBest();
            return (
                <p>The closest station to you is <b>{closest.station.name}</b> which is {distance.val.toFixed(2)}{distance.unit} away from you</p>
            );
        }
    }
    
    return (
        <div>
            <p>Your current location:</p>
            <p>Latitude: {latLon.lat}</p>
            <p>Longitude: {latLon.lon}</p>
            {getClosest()}
        </div>
    );
}

export default GPS;
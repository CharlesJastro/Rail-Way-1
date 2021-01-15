const express = require('express');
const app = express();
const port = 3001;
const unirest = require("unirest");
const bodyParser = require('body-parser');
const {DateTime} = require('luxon');
// app.get('/api/associations/:word', (req, res) => {
//     const request = unirest("GET", "https://twinword-word-associations-v1.p.rapidapi.com/associations/");
//     request.query({ "entry": req.params.word });
//     request.headers({
//         "x-rapidapi-host": "twinword-word-associations-v1.p.rapidapi.com",
//         "x-rapidapi-key": "53ef22d262msha107fd0580713eep115b0ejsn409e83a40dd4",
//         "useQueryString": true
//     });
//     request.end(function (response) {
//         if (response.error) {
//             throw new Error(response.error);
//         } 
//         res.json(response.body.associations_scored || {});
//     });
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//let dt=DateTime.fromObject({hour: 12, minute: 37})

//console.log(dt);

const route= [
    {
        id:1,
        name:'Kd to Abj',
        departure: (DateTime.fromObject({hour: 6, minute: 40})).toLocaleString(DateTime.TIME_SIMPLE),
        arrival: (DateTime.fromObject({hour: 8, minute: 43})).toLocaleString(DateTime.TIME_SIMPLE),
        fare: 50
    },
    {
        id:2,
        name:'Abj to Kd',
        departure: (DateTime.fromObject({hour: 10, minute: 35})).toLocaleString(DateTime.TIME_SIMPLE),
        arrival: (DateTime.fromObject({hour: 13, minute: 20})).toLocaleString(DateTime.TIME_SIMPLE),
        fare: 20
    }
]
app.get('/routes', (req,res)=>{
    res.send(route)
});

app.post('/routes', (req, res)=>{
    let newRoute = {
        id: route.length+1,
        name: req.body.name,
        departure: (DateTime.fromObject({hour: req.body.departureHour, minute: req.body.departureMinute})).toLocaleString(DateTime.TIME_SIMPLE),
        arrival: (DateTime.fromObject({hour: req.body.arrivalHour, minute: req.body.arrivalMinute})).toLocaleString(DateTime.TIME_SIMPLE),
        fare: req.body.fare
    };
    
    route.push(newRoute);
    
    res.send(route);
    
});

app.delete('/routes', (req, res) => {
    let id = req.body.id;
    console.log(route.findIndex((obj)=> obj.id === id));
    let i = route.findIndex((obj)=> obj.id === id);
    if (i !== -1) {
        route.splice(i, 1);
        res.send(route);
    } else {
        res.send('Id not found');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
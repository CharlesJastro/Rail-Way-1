const express = require('express');
const app = express();
const port = 3001;
const unirest = require("unirest");
const bodyParser = require('body-parser');
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

const route= [
    {
        id:1,
        name:'Kd to Abj',
        arrivalHour: 8,
        departureHour:6,
        arrivalMinute: 43,
        departureMinute:40
        
    },
    {
        id:2,
        name:'Abj to Kd',
        arrivalHour:13 ,
        departureHour:10,
        arrivalMinute:20,
        departureMinute:35

    }
]
app.get('/routes', (req,res)=>{
    res.send(route)
});

app.post('/routes', (req, res)=>{
    let newRoute = {
        id: route.length+1,
        name: req.body.name,
        arrivalHour: req.body.arrivalHour,
        arrivalMinute: req.body.arrivalMinute,
        departureHour: req.body.departureHour,
        departureMinute: req.body.departureMinute
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
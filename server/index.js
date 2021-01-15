require('dotenv').config()
const express = require('express');
const app = express();
const port = 3001;
const unirest = require("unirest");
const bodyParser = require('body-parser');
const mongoose=require('mongoose')
const {DateTime} = require('luxon');
const morgan = require('morgan');
const Route= require('./models/route')

//DATABASE CONNECTION
const dbURI=process.env.DATABASE_URL;
mongoose.connect(dbURI,{useUnifiedTopology:true, useNewUrlParser:true})
.then((result)=>console.log('Connected to DB'))
.catch((err)=>console.log(err))
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
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));

//let dt=DateTime.fromObject({hour: 12, minute: 37})

//console.log(dt);
/*
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
*/
// app.get('/routes',(req,res)=>{
//     const route= new Route({
//         id:1,
//         name:'Calgary to Edmonton',
//         departureHour:10,
//         departureMinute:35,
//         arrivalHour:13,
//         arrivalMinute:20,
//         fare:23
//     });
//     route.save()
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })
//GET
app.get('/routes',(req,res)=>{
    Route.find().then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err)
    });
})
//POST

// app.post('/routes',(req,res)=>{
//     const route= new Route(req.body);
//     route.save()
//     .then((result)=>{
//         res.send('Routes save to database')
//     }).catch((err)=>{
//         console.log(err);
//     })
// })
// app.get('/routes/:id',(req,res)=>{
//     const id = req.params.id;
//     Route.findById(id)
//     .then(result=>{
//         res.send('routes detail')
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })
//DELETE
// app.delete('routes/:id',(req,res)=>{
//     const id= req.params.id;
//     Route.findByIdAndDelete(id)
//     .then(result=>{
//         res.json({ redirect: '/routes'})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })

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
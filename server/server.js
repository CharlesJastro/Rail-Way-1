// Server.  require express 
require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const unirest = require("unirest");
const bodyParser = require('body-parser');
const mongoose=require('mongoose')
const {DateTime} = require('luxon');
const morgan = require('morgan');
const cookieParser=require('cookie-parser')
var path = require('path');


// Middleware app.use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));
app.use(cookieParser());

//ROUTER  
const routeRouter=require('./routes/route.js')
// Create router for notification requests
const notifRouter = require('./routes/notifications.js');
// Create router for exceptions requests
const exceptionsRouter = require('./routes/exceptions.js');
//Router for STATIONS
const stationsRouter=require('./routes/stations.js')
const userRouter=require('./routes/userRouter.js')
//Router Admin login
//const adminsRouter=require('./routes/adminsLogin')
//Use station router
app.use('/stations', stationsRouter)

app.use('/routes',routeRouter)
// Use notification router
app.use('/notifications', notifRouter);
// Use exceptions router
app.use('/exceptions', exceptionsRouter);
app.use('/auth', userRouter)
//use admin router
//app.use('/admins',adminsRouter)

app.use(express.static(path.join(__dirname, '../client/build')));


app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});

//DATABASE CONNECTION
const dbURI=process.env.DATABASE_URL;
mongoose.connect(dbURI,{useUnifiedTopology:true, useNewUrlParser:true})
.then((result)=>console.log('Connected to DB'))
.catch((err)=>console.log(err))


// module.exports = app;
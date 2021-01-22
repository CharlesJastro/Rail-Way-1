//Import libraries to use
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create instance of Express library so we can code the API
const app = express();
//Make the instance use json format
app.use(express.json());
//make intance use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//======================== Connection String =============================
const mongoose = require('mongoose'); // import library
mongoose.connect('mongodb://localhost/schedule', { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

//Confirm connection to mongodb was successful
db.once('open', () => {
    console.log("connected to mongoDB successfully");
})

//Check if there are errors in the database
db.on('error', (err) => {
    console.log(err);
})

// load the model for newuser
let new_Schedule = require('./newSchedule');
let exception_Schedule = require('./exceptionSchedule');

//1st end-point i.e. this is the address the front end will target for a specific operation
app.get('/', (req, res) => {
    res.json("This is home page of API");
})

//1st end-point i.e. this is the address the front end will target for a specific operation
app.post('/new_schedule', (req, res) => {
    try {

        new_Schedule.find({ scheduleName: req.body.scheduleName }, (err, schedules) => {
            if (err) {
                res.json("error");
            }
            else {
                if (schedules.length != 0) {

                    res.json("Schedule name already exist");
                } else {
                    let newSchedule = new new_Schedule();
                    newSchedule.scheduleName = req.body.scheduleName;
                    newSchedule.schedule_id = req.body.schedule_id;
                    newSchedule.depatureSchedule = req.body.depatureSchedule;
                    newSchedule.arrivalSchedule = req.body.arrivalSchedule;
                    newSchedule.save((err) => {
                        if (err) {
                            res.json("Error registering schedule");
                        } else {
                            res.json("Schedule registration successful");
                        }
                    })
                }
            }
        });


    } catch (err) {
        res.json("error registering schedule");

    }

})
app.post('/exception_schedule', (req, res) => {
    try {

        exception_Schedule.find({ scheduleName: req.body.scheduleName }, (err, schedules) => {
            if (err) {
                res.json("error");
            }
            else {
                if (schedules.length != 0) {

                    res.json("Schedule name already exist");
                } else {
                    let newSchedule = new exception_Schedule();
                    exceptionSchedule.scheduleName = req.body.scheduleName;
                    exceptionSchedule.schedule_id = req.body.schedule_id;
                    exceptionSchedule.depatureSchedule = req.body.depatureSchedule;
                    exceptionSchedule.arrivalSchedule = req.body.arrivalSchedule;
                    exceptionSchedule.save((err) => {
                        if (err) {
                            res.json("Error registering schedule");
                        } else {
                            res.json("Schedule registration successful");
                        }
                    })
                }
            }
        });


    } catch (err) {
        res.json("error registering schedule");

    }

})


app.get('/get_all_schedule', (req, res) => {
    try {
        let allSchedules = [];
        new_Schedule.find({}, (err, schedules) => {
            if (err) {
                res.json("error");
            }
            else {
                for (let i = 0; i < schedules.length; i++) {
                    allSchedules.push(schedules[i]);
                }
                res.json(allSchedules);
            }
        });
    } catch (err) {
        res.json("error");

    }

})


//Declare a variable for our port to transmit on
//Process.env is used by cloud service if API is in the cloud and 3500 will be used by our computer to transmit
// '||' means 'OR' in JS
const port = process.env.PORT || 3600;

//Make instance of app listen for calls/requests
app.listen(port, () => console.log(`Server running on port: ${port}`));


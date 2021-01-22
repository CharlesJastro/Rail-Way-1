const mongoose = require('mongoose'); // import library

let newScheduleSchema = mongoose.Schema({
    scheduleName: {
        type: String,
        required: true
    },
    schedule_id: {
        type: String,
        required: true
    },
    depatureSchedule: {
        type: Object,
        required: true
    },
    arrivalSchedule: {
        type: Object,
        required: true
    },
})

let newSchedule = module.exports = mongoose.model("newSchedule", newScheduleSchema)
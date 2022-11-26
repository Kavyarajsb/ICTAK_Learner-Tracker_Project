const mongoose = require('mongoose');
const staffSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email :{
        type: String,
        required : true
    },
    password :{
        type: String,
        required : true
    },
    role :{
        type: String,
        required : true
    },
    createddt:{
        type: Date,
        default:Date.now()
    }
});

const staffInfo = mongoose.model('staff', staffSchema);
module.exports = staffInfo;
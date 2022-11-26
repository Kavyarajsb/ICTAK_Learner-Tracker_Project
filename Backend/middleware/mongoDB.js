const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://FSDJULY:project2022@cluster0.bgk7lrd.mongodb.net/LearnerTracker?retryWrites=true&w=majority')
.then(() => { console.log('MongoDB connected successfully');})
.catch( error => { console.log('MongoDB error - '+ error);})
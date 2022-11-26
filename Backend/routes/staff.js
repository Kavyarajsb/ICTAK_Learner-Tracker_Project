const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const staffInfo = require('../models/staff')

//read staff list 
router.get('/stafflist', async(req,res)=>{
    try {
        const list = await staffInfo.find();
        res.send(list);
    }
    catch(error) {
        console.log(error);
    }
})

// read single staff detail
router.get('/staff/:id',async(req,res)=>{
    try {
        let id = req.params.id;
        let staff = await staffInfo.findById(id);
        res.send(staff);
    }
    catch(error) {
        console.log(error);
    }
})

// add new staff
router.post('/staff', async(req,res)=>{
    try {
        // store the front end entered details in server variable
        console.log(req.body);
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            // store hash in the database
            let staffnew ={
                name: req.body.name,
                email: req.body.email,
                password: hash,
                role : req.body.role
            }

            let staff = new staffInfo(staffnew);
            let saveStaff = staff.save();
            res.send(saveStaff);                              
        });                   
    }
    catch(error) {
        console.log(error);
    }
})

// update staff detail
router.put('/staff', async(req, res) => {
    try {
        let id = req.body._id;
        let staff ={
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role : req.body.role
        }
        let updateStaff = { $set: staff };
        let updateInfo = await staffInfo.findByIdAndUpdate({'_id': id }, updateStaff);
        res.send(updateInfo)
    } catch (error) {
        console.log(error);
    }
})

// delete staff detail
router.delete('/staff/:id', async(req,res)=>{
    try {
        let id = req.params.id;
        let deleteStaff = await staffInfo.deleteOne({'_id':id});
        res.send(deleteStaff);
    }
    catch(error) {
        console.log(error);   
    }
})

module.exports = router;
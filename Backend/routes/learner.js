const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const learnerInfo = require('../models/learner')

//read learner list 
router.get('/learnerlist', async(req,res)=>{
    try {
        const list = await learnerInfo.find();
        res.send(list);
    }
    catch(error) {
        console.log(error);
    }
})

// read single learnerInfo detail
router.get('/learner/:id',async(req,res)=>{
    try {
        let id = req.params.id;
        let learner = await learnerInfo.findById(id);
        res.send(learner);
    }
    catch(error) {
        console.log(error);
    }
})

// add new learner
router.post('/learner', async(req,res)=>{
    try {
        // store the front end entered details in server variable
        console.log(req.body);
           let learnernew ={
                learnerid: req.body.learnerid,
                name: req.body.name,
                course: req.body.course,
                project: req.body.project,
                batch : req.body.batch,
                coursestatus: req.body.coursestatus,
                placementstatus: req.body.projectstatus
            }

            let learner = new learnerInfo(learnernew);
            let saveLearner = learner.save();
            res.send(saveLearner);                           
    }
    catch(error) {
        console.log(error);
    }
})

// update learner detail
router.put('/learner', async(req, res) => {
    try {
        let id = req.body._id;
        let learner ={
            learnerid: req.body.learnerid,
            name: req.body.name,
            course: req.body.course,
            project: req.body.project,
            batch : req.body.batch,
            coursestatus: req.body.coursestatus,
            placementstatus: req.body.projectstatus
        }
        let updateLearner = { $set: learner };
        let updateInfo = await learnerInfo.findByIdAndUpdate({'_id': id }, updateLearner);
        res.send(updateInfo)
    } catch (error) {
        console.log(error);
    }
})

// delete learner detail
router.delete('/learner/:id', async(req,res)=>{
    try {
        let id = req.params.id;
        let deleteLearner = await learnerInfo.deleteOne({'_id':id});
        res.send(deleteLearner);
    }
    catch(error) {
        console.log(error);   
    }
})

module.exports = router;
require("dotenv").config();
const express = require("express");

const teamModel=require('../Models/team.model');
const timeCardModel = require("../Models/timeCard.model");
const teamRouter = express.Router();

// ADD
teamRouter.post('/addteam',async(req,res)=>{
    const teams= new teamModel(req.body)
    try {
        const savedteam=await teams.save()
        console.log(savedteam)
        res.status(201).send(savedteam)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// GET ALL
teamRouter.get('/',async(req,res)=>{
    try {
        const teams=await teamModel.find()
        res.status(200).send(teams)
    } catch (error) {
        res.status(400).send(error.message)
    }

})

// GET ONE
teamRouter.get('/:id',async(req,res)=>{
    const {id}=req.params
    // console.log(id)
    try {
        const teams=await teamModel.findById({_id:id});
        if(!teams){
            return res.status(404).send()
        }
        res.status(200).send(teams)
    } catch (error) {
        res.status(404).send(error)
    }
})


    // DELETE

    teamRouter.delete('/:id',async(req,res)=>{
        const {id}=req.params
        
        try {
            const team=await teamModel.findByIdAndDelete({_id:id})
            if(!lead){
                return res.status(404).send()
            }
            res.status(200).send(lead)
        } catch (error) {
            res.status(404).send(error)
        }
    })

    // ADD TIME CARD
    teamRouter.post('/addTime',async(req,res)=>{
        const timeCard= new timeCardModel(req.body)
        try {
            const savedcard=await timeCard.save()
            console.log(savedcard)
            res.status(201).send(savedcard)
        } catch (error) {
            res.status(400).send(error.message)
        }
    })

    // GET ALL ATTENDACE
    teamRouter.get('/attendace',async(req,res)=>{
        try {
            const timeCard=await timeCardModel.find()
            res.status(200).send(timeCard)
        } catch (error) {
            res.status(400).send(error.message)
        }
    })



module.exports={teamRouter}
require("dotenv").config();
const express = require("express");

const leadModel = require('../Models/lead.model');
const leadRouter = express.Router();

// ADD
leadRouter.post('/addlead',async(req,res)=>{
    const leads= new leadModel(req.body)
    try {
        const savedLead=await leads.save()
        console.log(savedLead)
        res.status(201).send(savedLead)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// GET ALL
leadRouter.get('/',async(req,res)=>{
    try {
        const leads=await leadModel.find()
        res.status(200).send(leads)
    } catch (error) {
        res.status(400).send(error.message)
    }

})

// GET ONE
leadRouter.get('/:id',async(req,res)=>{
    const {id}=req.params
    // console.log(id)
    try {
        const leads=await leadModel.findById({_id:id});
        if(!leads){
            return res.status(404).send()
        }
        res.status(200).send(leads)
    } catch (error) {
        res.status(404).send(error)
    }
})
    // UPDATE
    leadRouter.patch('/:id',async(req,res)=>{
        const {id}=req.params
        try {
            const leads=await leadModel.findByIdAndUpdate({_id:id},req.body)
            if(!leads){
                return res.status(404).send()
            }
            res.status(200).send(leads)
        } catch (error) {
            res.status(404).send(error)
        }
    })

    // DELETE

    leadRouter.delete('/:id',async(req,res)=>{
        const {id}=req.params
        
        try {
            const lead=await leadModel.findByIdAndDelete({_id:id})
            if(!lead){
                return res.status(404).send()
            }
            res.status(200).send(lead)
        } catch (error) {
            res.status(404).send(error)
        }
    })

    // SEARCH & FILTER

    leadRouter.get('/search',async(req,res)=>{
        const { name, Owner} = req.query;
        const filter = {};
    
        if (name) filter.name = name;
        if (Owner) filter.Owner = Owner;
    
        try {
            const items = await lead.find(filter);
            res.status(200).send(items);
        } catch (error) {
            res.status(400).send(error);
        }
    })


module.exports={leadRouter}
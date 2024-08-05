require("dotenv").config();
const express = require("express");

const Invoice=require('../Models/invoice.model');
const ItemModel = require("../Models/items.model");
const salesRouter = express.Router();

// ADD
salesRouter.post('/addsales',async(req,res)=>{
    const sales= new Invoice(req.body)
    try {
        const savedsales=await sales.save()
        console.log(savedsales)
        res.status(201).send(savedsales)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// GET ALL
salesRouter.get('/',async(req,res)=>{
    try {
        const sales=await Invoice.find()
        res.status(200).send(sales)
    } catch (error) {
        res.status(400).send(error.message)
    }

})

// GET ONE
salesRouter.get('/:id',async(req,res)=>{
    const {id}=req.params
    try {
        const sales=await Invoice.findById({_id:id});
        if(!sales){
            return res.status(404).send()
        }
        res.status(200).send(sales)
    } catch (error) {
        res.status(404).send(error)
    }
})
    // UPDATE
    salesRouter.patch('/:id',async(req,res)=>{
        const {id}=req.params
        try {
            const sales=await Invoice.findByIdAndUpdate({_id:id},req.body)
            if(!sales){
                return res.status(404).send()
            }
            res.status(200).send(sales)
        } catch (error) {
            res.status(404).send(error)
        }
    })

    // DELETE

    salesRouter.delete('/:id',async(req,res)=>{
        const {id}=req.params
        try {
            const sales=await Invoice.findByIdAndDelete({_id:id})
            if(!sales){
                return res.status(404).send()
            }
            res.status(200).send(sales)
        } catch (error) {
            res.status(404).send(error)
        }
    })

    // SEARCH & FILTER

    salesRouter.get('/search',async(req,res)=>{
        const { Client, Project} = req.query;
        const filter = {};
    
        if (Client) filter.Client = Client;
        if (Project) filter.Project = Project;
    
        try {
            const items = await Invoice.find(filter);
            res.status(200).send(items);
        } catch (error) {
            res.status(400).send(error);
        }
    })

    // ADD ITEMS
    salesRouter.post('/Additems',async(req,res)=>{
        const items= new ItemModel(req.body)
        try {
            const savedItems=await items.save()
            console.log(savedItems)
            res.status(201).send(savedItems)
        } catch (error) {
            res.status(400).send(error.message)
        }
    })

// GET ALL ITEMS
    salesRouter.get('/items',async(req,res)=>{
        try {
            const items=await ItemModel.find()
            res.status(200).send(items)
        } catch (error) {
            res.status(400).send(error.message)
        }
    
    })

// GET ONE ITEM

salesRouter.get('/items/:id',async(req,res)=>{
    const {id}=req.params
    try {
        const items=await ItemModel.findById({_id:id});
        if(!items){
            return res.status(404).send()
        }
        res.status(200).send(items)
    } catch (error) {
        res.status(404).send(error)
    }
})

// DELETE ONE ITEM

salesRouter.delete('/items/:id',async(req,res)=>{
    const {id}=req.params
    try {
        const items=await ItemModel.findByIdAndDelete({_id:id})
        if(!items){
            return res.status(404).send()
        }
        res.status(200).send(items)
    } catch (error) {
        res.status(404).send(error)
    }
})


module.exports={salesRouter}
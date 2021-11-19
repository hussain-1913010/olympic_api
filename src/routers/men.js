const express = require("express");
const router = new express.Router();
const MensRanking = require("../models/mens");



// will handle post request now
router.post("/mens", async (req, res) => {
    try{
        // const addingMensRecords = new MensRanking({
        //     "ranking": 1,
        //     "name": "Muneem Hussain",
        //     "dob": "26 Sep 2002",
        //     "country": "Bangladesh",
        //     "score": "1477"
        // })
        // addingMensRecords.save();
        const addingMensRecords = new MensRanking(req.body)
        console.log(req.body);
        const insertMens = await addingMensRecords.save();
        res.status(201).send(insertMens);
    }catch(e){
        res.status(400).send(e);
    }
})

// handling read data using get method (with sorting from 1 . . in assending order)
router.get("/mens", async (req, res) => {
    try{
        const getMens = await MensRanking.find({}).sort({"ranking": 1});
        res.send(getMens);
    }catch(e){
        res.status(400).send(e);
    }
})

// handling individual data using get
router.get("/mens/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const getMen = await MensRanking.findById(_id);
        res.send(getMen);
    }catch(e){
        res.status(400).send(e);
    }
})


// put vs patch: put is total change, patch is few key value change
// handling data using patch
router.patch("/mens/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const getMen = await MensRanking.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(getMen);
    }catch(e){
        // 500 means server error 400 means bad request
        res.status(500).send(e);
    }
})


// handling delete using delete method
router.delete("/mens/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const getMen = await MensRanking.findByIdAndDelete(_id);
        res.send(getMen);
    }catch(e){
        // 500 means server error 400 means bad request
        res.status(500).send(e);
    }
})


module.exports = router;
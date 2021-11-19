const express = require("express");
require("../src/db/connection");

const MensRanking = require("../src/models/mens");

const app = express();
const port = process.env.PORT || 3000;

// we should give permission to write with json data to express
// because postman is sending data as a json format
// but we don't know what is the format of data . . so we need to define json data
app.use(express.json());

// will handle post request now
app.post("/mens", async (req, res) => {
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

// handling read data using get method
app.get("/mens", async (req, res) => {
    try{
        const getMens = await MensRanking.find({});
        res.send(getMens);
    }catch(e){
        res.status(400).send(e);
    }
})

// handling individual data using get
app.get("/mens/:id", async (req, res) => {
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
app.patch("/mens/:id", async (req, res) => {
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
app.delete("/mens/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const getMen = await MensRanking.findByIdAndDelete(_id);
        res.send(getMen);
    }catch(e){
        // 500 means server error 400 means bad request
        res.status(500).send(e);
    }
})


app.get("/", async (req, res)=> {
    res.send("Hello from home");
})

app.listen(port, () => {
    console.log(`connection is live at port no ${port}`);
})




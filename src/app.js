const express = require("express");
require("../src/db/connection");

const router = require("./routers/men")
// const MensRanking = require("../src/models/mens");

const app = express();
const port = process.env.PORT || 3000;

// we should give permission to write with json data to express
// because postman is sending data as a json format
// but we don't know what is the format of data . . so we need to define json data
app.use(express.json());

// all operations like get, post, patch, delete are transfered to 
// express router . . .check router folder and will founded them . .hope so
// and we need to register our router lilke below
app.use(router);



app.get("/", async (req, res)=> {
    res.send("Hello from home");
})

app.listen(port, () => {
    console.log(`connection is live at port no ${port}`);
})




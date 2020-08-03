const express = require('express');
const app = express()
const dfff = require('dialogflow-fulfillment')

const PORT = process.PORT || 4000 

app.get('/', (req, res)=>{
    res.send("we are online")
    console.log("App started at " + PORT);
});


app.listen(PORT)
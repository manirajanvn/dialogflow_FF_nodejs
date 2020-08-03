const express = require('express');
const app = express()
const dfff = require('dialogflow-fulfillment')

const PORT = process.PORT || 4000 

app.get('/', (req, res)=>{
    res.send("we are online")
    
});

app.post('/', (req, res)=>{
    const agent = new dfff.WebhookClient({
        request: req,
        response: res
    });

    function hoursDelivery (agent){
        agent.add("Working hours from servers")
    }

    var intentMap = new Map();
    intentMap.set("hourDelivery", hoursDelivery)
})


app.listen(PORT)
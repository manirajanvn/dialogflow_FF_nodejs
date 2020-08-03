const express = require('express');
const app = express();
const dfff = require('dialogflow-fulfillment');


var admin = require("firebase-admin");

var serviceAccount = require('./config/car-wash-ytruvk-firebase-adminsdk-gxug5-88c38f4a08.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://car-wash-ytruvk.firebaseio.com"
});

var db = admin.firestore();

app.get('/', (req, res)=>{
    res.send("We are live")
});

app.post('/', express.json(), (req, res)=>{
    const agent = new dfff.WebhookClient({
        request : req,
        response : res
    });

    function demo(agent){
        agent.add("Sending response from Webhook server as v1.1.11.1");
    }

    function save_request(agent){
        agent.add("Sending response from Webhook server as v1.1.11.1");
    }

    function wash_request(agent){
        var vehicle = agent.context.get("wash_options").parameters.vehicle;
        var options = agent.context.get("wash_options").parameters.options;
  
        console.log(vehicle);
        console.log(options);
        agent.add(`Request for ${vehicle} ${options} wash confirmed.`);
  
        return db.collection('carwash').add({
          vehicle : vehicle,
          options : options,
          time : Date.now()
        }).then(ref =>
  
          //fetching free slots from G-cal
          console.log("Reaquest details added to DB")
          )
  
      }
  

    var intentMap = new Map();
    intentMap.set('demo',demo )
    intentMap.set('wash_options',wash_request )

    agent.handleRequest(intentMap);

});

app.listen(4000, ()=>console.log("Server is live at port 3333"));
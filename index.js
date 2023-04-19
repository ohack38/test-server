const express = require("express");
const bodyParser = require('body-parser');

const parser = require('./parser')
const airwitsParser = require('./airwitsParser')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MILESIGHT IO SENSOR
app.post('/lora', (req, res) => {
    //console.log('Got body:', req.body);
    res.sendStatus(200);
    const uplink = req.body.DevEUI_uplink
    if(uplink){
        console.log('data:', uplink.payload_hex, uplink.FPort, uplink.Time)
        const parsed = parser.Decoder(uplink.payload_hex, uplink.FPort)
        console.log('parsed: ', parsed)
    }
    
});

// ERS-sound
app.post('/ers-sound', (req, res) => {
    //console.log('Got body:', req.body);
    res.sendStatus(200);
    
});


// ERS-eye
app.post('/ers-eye', (req, res) => {
    //console.log('Got body:', req.body);
    res.sendStatus(200);
    
});
// airwits 
app.post('/airwits', (req, res) => {
    //console.log('Got body:', req.body);
    let data = req.body.data
    airwitsParser.parser(data)
    res.sendStatus(200);
    
});

app.post('/', (req, res) => {
    console.log('Got body:', req.body);
    res.sendStatus(200);
    
});

app.get("/", (req, res) => res.send("Hello World!"));


app.listen(80, () => console.log("Server listening on port 80!"));


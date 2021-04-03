const express = require('express')
const app = express()
const fs = require('fs')
const port = 3000
var path = require('path');

app.use(express.static(__dirname + '/public/'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/doctors', (req, res) => {
    let db = fs.readFileSync('myData.json');
    let data = JSON.parse(db);
    var myDoctors = [];

    for (item in data["Doctors"]){
        var doctorObject = {"Name" : data["Doctors"][item]["Name"], "ID" : data["Doctors"][item]["ID"]}
        myDoctors.push(doctorObject);
    }
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(myDoctors));
})

app.get('/doctors/:ID', (req, res) => {
    let db = fs.readFileSync('myData.json');
    let data = JSON.parse(db);

    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(data["Doctors"][req.params.ID]));
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
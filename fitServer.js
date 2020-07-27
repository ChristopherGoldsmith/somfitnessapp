const express = require('express');
const Datastore = require('nedb');
const { response } = require('express');
const app = express();
app.listen(4000, () => console.log('listening fitServer'))
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}))

const database = new Datastore('datastore.db');
database.loadDatabase();

app.post('/users', (request, response) => {
    console.log(`Creating Account UN:${request.body.username} PW:${request.body.password}`);
    const data = request.body;
    database.insert(data);
    response.json(data);
});

app.get('/users', (req, res) =>{
    console.log(req.query);
    database.find({}, (err, data) => {
        if(err){
            console.log('An error has occured');
            return res.end();
        } else{
            return res.json(data);
        }
    })
});
app.get('/authUsers/:username/:password', (req, res) =>{
    const data =  req.params;
    console.log(data);
    database.find({}, (err, data) => {
        if(err){
            console.log('error id400 has occured');
        } else{
            return res.json(data);
        }
    })
});
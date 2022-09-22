const express = require("express")
const app = express()
const path= require("path")
const PORT = process.env.PORT || 3001
var bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/budget';
const client = new MongoClient(url);

const collection = client.db().collection('budget');

//MIDDLEWARE
app.use(express.static('frontend'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
require('dotenv').config()
// parse application/json
app.use(bodyParser.json())
//END MIDDLEWARE
var database= [
    {userid:12335, username:"Runa", userdata:["skiing", "biking", "golfing", "coding"]},
    {userid:12121, username:"Skadi", userdata:["Javascript", "HTML", "CSS", "C#"]}
]

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, './frontend','html', 'index.html'))
})

app.get("/api/users/:username", (req, res)=>{
    res.json({userid:12335, username:"Runa", userdata:["skiing", "biking", "golfing", "coding"]})
})

app.get("/api/allusers", (req, res)=>{
    res.json(database)
})

app.post("/api/adduser", (req, res)=>{
    console.log(req.body)
    collection.insertOne(req.body)
    .then(data=>{
        console.log("INSIDE THE POST ROUTE WITH DATA")
        res.json(data)
    })
})

app.get("/all", async (req, res)=>{
    var data = []
    try {
       data = await collection.find({}).toArray();
       console.log(data)
      } catch (error) {
        if (error instanceof MongoServerError) {
          console.log(`Error worth logging: ${error}`); // special case for some reason
        }
        throw error; // still want to crash
      }

      res.json(data)
})

app.listen(PORT,()=>{
    console.log("Listening on port "+ PORT)
})



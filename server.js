const express = require("express")
const app = express()
const path= require("path")
const PORT = process.env.PORT || 3001
var bodyParser = require('body-parser')
//MIDDLEWARE
app.use(express.static('frontend'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

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
    database.push(req.body)
    res.json(req.body)
})

app.listen(PORT,()=>{
    console.log("Listening on port "+ PORT)
})
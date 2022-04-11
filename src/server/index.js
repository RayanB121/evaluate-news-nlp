var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const mockAPIResponse = require('./mockAPI.js')

const app = express()

const dotenv = require('dotenv')
dotenv.config();

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)



let projectData={};
console.log(process.env.API_KEY);
app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/add',(req,res)=>{
    projectData["model"]=req.body.model;
    projectData["score_tag"]=req.body.score_tag;
    projectData["agreement"]=req.body.agreement;
    projectData["subjectivity"]=req.body.subjectivity;
    projectData["confidence"]=req.body.confidence;
    projectData["irony"]=req.body.irony;
    res.send(projectData);

})

app.get("/key",(req,res)=>{
    res.send(process.env.API_KEY);
})

app.get("/all",(req,res)=>{
    res.send(projectData)
})
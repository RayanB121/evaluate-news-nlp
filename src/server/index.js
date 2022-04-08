var path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mockAPIResponse = require('./mockAPI.js')

const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)

const baseUrl='https://api.meaningcloud.com/sentiment-2.1';
const apiKey= process.env.API_KEY;
let userInput=[];

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/input',async(req,res)=>{
    userInput= req.body.url;
    const apiUrl=`${baseUrl}key=${apiKey}&url=${userInput}&lang=en`;
    const response= await fetch(apiUrl);
    const data=await response.json();
    res.send(data);
})

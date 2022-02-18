require('dotenv').config()

var express = require('express');
var app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/json', (req, res) => {
    const message = (process.env.MESSAGE_STYLE == 'uppercase') ? "HELLO JSON" : "Hello json"
    res.json({"message": message})
})


//Serves 'public' assets to /public route
//QUESTION - why if you need to mount middlewhere before there request, does the this middleware
//serve public stylesheets to the html file even though it is implemented before the app.get
app.use('/public', express.static('public'))

//REST API - REpresentational State Transfer API allows data exchanges without the need for clients to know
//detials about the server, only the endpoint and the verb

module.exports = app;
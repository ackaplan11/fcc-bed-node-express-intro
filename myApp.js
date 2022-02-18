require('dotenv').config()

var express = require('express');
var app = express();
console.log('Hello World')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/json', (req, res) => {
    const message = (process.env.MESSAGE_STYLE == 'uppercase') ? "HELLO JSON" : "Hello json"
    res.json({"message": message})
})
//Serves 'public' assets to /public route
app.use('/public', express.static('public'))

//REST API - REpresentational State Transfer API allows data exchanges without the need for clients to know
//detials about the server, only the endpoint and the verb

module.exports = app;
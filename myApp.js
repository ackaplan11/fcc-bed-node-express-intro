var express = require('express');
var app = express();
console.log('Hello World')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.use(express.static('public'))


 module.exports = app;
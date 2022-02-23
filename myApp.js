require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})

//Figure out wtf this does

app.use(bodyParser.urlencoded({ extended: false }))

//REST API - REpresentational State Transfer API allows data exchanges without the need for clients to know
//detials about the server, only the endpoint and the verb

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/json', (req, res) => {
    const message = (process.env.MESSAGE_STYLE == 'uppercase') ? "HELLO JSON" : "Hello json"
    res.json({ "message": message })
})

//Chain Middleware - middlewhere function needs to have req,res,next or it will not work
app.get('/now', (req, res, next) => {
    req.time = new Date().toString()
    next() 
}, (req, res) => {
    res.json({ "time": req.time })
})

//Dynamic Route with ':' character, results passed to req.params
//EX route_path: '/user/:userId/book/:bookId'
//actual_request_URL: '/user/546/book/6754'
//req.params: {userId: '546', bookId: '6754'}

app.get('/:word/echo', (req, res) => {
    res.json({"echo": req.params.word})
})

//Queried Routes with data passed into the url request under the hood using '?' 
//EX route_path: '/library' 
//actual_request_URL: '/library?userId=546&bookId=6754'
//req.query: {userId: '546', bookId: '6754'}

app.route('/name').get((req, res) => {
    res.json({ "name": `${req.query.first} ${req.query.last}` })
}).post((req, res) => {
    res.json({ "name": `${req.body.first} ${req.body.last}` })
})

//Serves 'public' assets to /public route
//QUESTION - why if you need to mount middlewhere before there request, does the this middleware
//serve public stylesheets to the html file even though it is implemented before the app.get

app.use('/public', express.static('public'))

//QUESTION - what is the imporance of module.exports = app?
module.exports = app;
const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express();
app.use(cors())

app.use(bodyParser.json())

const commentsByPostId = {};

app.post('/events', (req, res) => {
    const event = req.body;
    axios.post('http://localhost:4000/events', event)
    axios.post('http://localhost:4001/events', event)
    axios.post('http://localhost:4002/events', event)
    axios.post('http://localhost:4003/events', event)

    res.send('OK')
})

app.listen(4005, () => {
    console.log('Listening on 4005 EVENT BUS!')
})
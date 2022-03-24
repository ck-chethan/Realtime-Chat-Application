const express = require('express')
const dotenv = require('dotenv')
const { chats } = require('./data/data.js')
const connectDB = require('./config/db.js')
const colors = require('colors')

const app = express()
dotenv.config()
connectDB()

app.get('/', (req, res) => {
  res.send('API IS RUNNINg')
})

app.get('/api/chat', (req, res) => {
  res.send(chats)
})

app.get('/api/chat/:id', (req, res) => {
  //console.log(req.params.id)
  const singleChat = chats.find((c) => c._id === req.params.id)
  res.send(singleChat)
})

const PORT = process.env.PORT

app.listen(8000, () => {
  console.log(`Server Listenining on port ${PORT}`.yellow.bold)
})

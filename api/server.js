const express = require('express')
const dotenv = require('dotenv')
const { chats } = require('./data/data.js')
const connectDB = require('./config/db.js')
const colors = require('colors')
const userRoutes = require('./routes/userRoutes.js')
const app = express()
dotenv.config()
connectDB()

app.get('/', (req, res) => {
  res.send('API IS RUNNING')
})

app.use('/api/user', userRoutes)

const PORT = process.env.PORT

app.listen(8000, () => {
  console.log(`Server Listenining on port ${PORT}`.yellow.bold)
})

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const router = require('./router')

app.use(express.static('public'))

app.use(router)

const url = require('./config/dbUrl').url

mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false })

const mongoseDb = mongoose.connection

mongoseDb.on('error', console.error.bind(console, 'connection error:'))
mongoseDb.once('open', () => {
  app.listen(8080, () => {
    console.log('Listening on Port 8080...')
  })
})

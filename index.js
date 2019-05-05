const express = require('express')
const app = express()
const mongoose = require('mongoose')

const router = require('./router')

app.use(express.static('public'))

app.use(router)

const url = require('./config/dbUrl').url

mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false })

const mongoDb = mongoose.connection

mongoDb.on('error', console.error.bind(console, 'connection error:'))
mongoDb.once('open', () => {
  app.listen(8080, () => {
    console.log('Listening on Port 8080...')
  })
})

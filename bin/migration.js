/* eslint-disable no-console */
const mongoose = require('mongoose')
const Destination = require('../models/Destination').model

const url = require('../config/dbUrl').url

mongoose.connect(url, { useNewUrlParser: true })

var mongoDb = mongoose.connection
mongoDb.on('error', console.error.bind(console, 'connection error:'))
mongoDb.once('open', function() {
  console.log('Connected')
})

var firebase = require('firebase-admin')

var authData = require('../config/auth.json')

firebase.initializeApp({
  credential: firebase.credential.cert(authData),
  databaseURL: 'https://js-for-web-kat.firebaseio.com'
})

var firebaseDb = firebase.firestore()
var destinations = firebaseDb.collection('destinations')
destinations.get().then(snapshot => {
  const docs = snapshot.docs
  docs.forEach(mapData)
})

const mapData = destination => {
  const destinationData = destination.data()

  destinationData.position = {
    latitude: destinationData.position._latitude,
    longitude: destinationData.position._longitude
  }

  destinationData.images = destinationData.images.map(item => {
    return { url: item }
  })

  let newModel = new Destination(destinationData)

  newModel.save()
}

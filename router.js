const express = require('express')
const router = express()

const controllers = require('./controllers/controllers')

router.get('/api/get-destinations', controllers.getDestinations)

router.post('/api/add-destination', controllers.addDestination)

router.patch('/api/update-destination', controllers.updateDestination)

router.delete('/api/delete-destination', controllers.deleteDestination)

module.exports = router

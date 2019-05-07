const express = require('express')
const router = express()

const controllers = require('./controllers/controllers')

router.get('/api/destination', controllers.getDestination)

router.post('/api/destination', controllers.addDestination)

router.patch('/api/destination', controllers.updateDestination)

router.delete('/api/destination', controllers.deleteDestination)

module.exports = router

const Destination = require('../models/destination').model

exports.getDestinations = (req, res) => {
  const filter = req.query.id ? { _id: req.query.id } : {}

  Destination.find(filter, (err, result) => {
    if (err) {
      return res.send(err.message)
    }
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(result))
  })
}

exports.addDestination = (req, res) => {
  const name = req.query.name
  const continent = req.query.continent
  const userName = req.query.userName
  Destination.create({ name: name, continent: continent, userName: userName }, err => {
    if (err) {
      return res.send(err.message)
    }
    res.send('Destination ' + name + ' created.')
  })
}

exports.updateDestination = (req, res) => {
  const id = req.query.id
  const userName = req.query.userName
  Destination.findByIdAndUpdate(id, { userName: userName }, err => {
    if (err) {
      return res.send(err.message)
    }
    res.send('Destination with ID ' + id + ' updated.')
  })
}

exports.deleteDestination = (req, res) => {
  const id = req.query.id
  Destination.findByIdAndDelete(id, err => {
    if (err) {
      return res.send(err.message)
    }
    res.send('Destination with ID ' + id + ' deleted.')
  })
}

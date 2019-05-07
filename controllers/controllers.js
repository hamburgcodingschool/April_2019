const Destination = require('../models/destination').model

exports.getDestination = (req, res) => {
  const filter = req.query.id ? { _id: req.query.id } : {}

  Destination.find(filter)
    .exec()
    .then(result => {
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(result))
    })
    .catch(err => res.send(err.message))
}

exports.addDestination = (req, res) => {
  const name = req.query.name
  const continent = req.query.continent
  const userName = req.query.userName
  Destination.create({ name: name, continent: continent, userName: userName })
    .then(result => {
      res.send('Destination ' + result.name + ' created: ' + result)
    })
    .catch(err => res.send(err.message))
}

exports.updateDestination = (req, res) => {
  const id = req.query.id
  const userName = req.query.userName
  Destination.findByIdAndUpdate(id, { userName: userName }, { new: true })
    .exec()
    .then(result => {
      res.send('Destination ' + result.name + ' updated: ' + result)
    })
    .catch(err => res.send(err.message))
}

exports.deleteDestination = (req, res) => {
  const id = req.query.id
  Destination.findByIdAndDelete(id)
    .exec()
    .then(result => {
      res.send('Destination ' + result.name + ' deleted: ' + result)
    })
    .catch(err => res.send(err.message))
}

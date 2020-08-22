const express = require('express')

const crypto = require('crypto')

const OngController = require('./controllers/OngController')
const incidentController = require('./controllers/incidentController')
const ProfController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const conection = require('./database/conection');

const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create)

routes.get('/profile', ProfController.index)

routes.get('/incidents', incidentController.index)
routes.post('/incidents', incidentController.create)

routes.delete('/incidents/:id', incidentController.delete)


module.exports = routes
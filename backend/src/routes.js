const express = require('express');
const ongcontroller = require('./controllers/OngController');
const incidentscontroller = require('./controllers/IncidentController');
const profilecontroller = require('./controllers/ProfileController');
const sessioncontroller = require('./controllers/SessionController');


const routes = express.Router();

routes.post('/session', sessioncontroller.create);

routes.get('/ongs', ongcontroller.index);
routes.post('/ongs', ongcontroller.create);

routes.get('/profile', profilecontroller.index);

routes.get('/incidents', incidentscontroller.index);
routes.post('/incidents', incidentscontroller.create);
routes.delete('/incidents/:id', incidentscontroller.delete);


module.exports = routes;
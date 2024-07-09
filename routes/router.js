const express = require('express');
const router = express.Router();
const {
   registrarTicket,
   mostrarTickets,
   borrarTicket,
   editarTicket,
} = require('../controllers/index');
const { validarPost, validarTicket } = require('../middlewares/index');
const { buscarTicket } = require('../consultas/consultas');

router.post('/tickets', validarPost, registrarTicket);

router.get('/tickets', mostrarTickets);

router.delete('/tickets/:id', validarTicket, borrarTicket);

router.put('/tickets/:id', validarTicket, editarTicket);

module.exports = router;

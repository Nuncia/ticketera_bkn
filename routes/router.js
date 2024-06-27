const express = require('express');
const router = express.Router();
const {
   registrarTicket,
   mostrarTickets,
   borrarTicket,
} = require('../controllers/index');
const { validarPost, validarTicket } = require('../middlewares/index');
// const { listarTickets } = require('../consultas/consultas');

// router.post('/tickets', async (req, res) => {
//    try {
//       const { titulo, descripcion, idTipo, idPrioridad, idEstado } = req.body;
//       console.log(
//          'Esto es POST:',
//          titulo,
//          descripcion,
//          idTipo,
//          idPrioridad,
//          idEstado
//       );
//       if (!titulo || !descripcion || !idTipo || !idPrioridad || !idEstado) {
//          res.status(400).json({ error: 'Por favor, rellene todos los campos' });
//          return;
//       }
//       const ticket = await crearTicket({
//          titulo,
//          descripcion,
//          idTipo,
//          idPrioridad,
//          idEstado,
//       });
//       console.log(ticket);
//       // estado creado
//       const respuesta = {
//          status: 'Ticket creado',
//          msg: '',
//       };
//       res.status(201).json(ticket);
//       return;
//    } catch (error) {
//       res.status(500).json({
//          error: `Error al crear el ticket: ${error.message}`,
//       });
//    }
// });
router.post('/tickets', validarPost, registrarTicket);

router.get('/tickets', mostrarTickets);

router.delete('/tickets/:id', validarTicket, borrarTicket);

router.put('/ticket/:id', async (req, res) => {
   try {
      const { prioridad, estado } = req.body;
      const { id } = req.params;
      console.log('PUT:', id, prioridad, estado);
      const ticketMessage = await modificarTicket(id, prioridad, estado);
      res.status(200).json(ticketMessage);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

module.exports = router;

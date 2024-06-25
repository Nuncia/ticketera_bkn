const express = require('express');
const router = express.Router();

const {
   listarTickets,
   crearTicket,
   modificarTicket,
   eliminarTicket,
} = require('../consultas/consultas');

router.post('/tickets', async (req, res) => {
   try {
      const { titulo, descripcion, idTipo, idPrioridad, idEstado } = req.body;
      console.log(
         'Esto es POST:',
         titulo,
         descripcion,
         idTipo,
         idPrioridad,
         idEstado
      );
      if (!titulo || !descripcion || !idTipo || !idPrioridad || !idEstado) {
         res.status(400).json({ error: 'Por favor, rellene todos los campos' });
         return;
      }
      const ticket = await crearTicket({
         titulo,
         descripcion,
         idTipo,
         idPrioridad,
         idEstado,
      });
      console.log(ticket);
      // estado creado
      const respuesta = {
         status: 'Ticket creado',
         msg: '',
      };
      res.status(201).json(ticket);
      return;
   } catch (error) {
      res.status(500).json({
         error: `Error al crear el ticket: ${error.message}`,
      });
   }
});

router.get('/tickets', async (req, res) => {
   try {
      const { rowCount, rows, msg } = await listarTickets();
      console.log('Tickets: ', rowCount, msg);
      res.json(rows);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

router.delete('/tickets/:id', async (req, res) => {
   try {
      const { id } = req.params;
      const idTicket = await eliminarTicket(id);
      console.log(idTicket);
      res.json(idTicket);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

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

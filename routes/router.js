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
      const { titulo, descripcion, id_tipo, idPrioridad, idEstado } = req.body;
      console.log(
         'Esto es POST:',
         titulo,
         descripcion,
         id_tipo,
         idPrioridad,
         idEstado
      );
      if (!titulo || !descripcion || !id_tipo || !idPrioridad || !idEstado) {
         res.status(400).json({ error: 'Por favor, rellene todos los campos' });
         return;
      }
      const ticket = await crearTicket({
         titulo,
         descripcion,
         id_tipo,
         idPrioridad,
         idEstado,
      });
      res.json(ticket);
      return;
   } catch (error) {
      res.status(500).json({
         error: `Error al crear el ticket: ${error.message}`,
      });
   }
});

router.get('/tickets', async (req, res) => {
   try {
      const tickets = await listarTickets();
      console.log('Tickets: ', tickets);
      res.json(tickets);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

router.delete('/tickets/:id', async (req, res) => {
   try {
      const { id } = req.params;
      console.log(id);
      const idTicket = await eliminarTicket(id);
      console.log(idTicket);
      res.json(idTicket);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

router.put('/ticket/id', async (req, res) => {
   try {
      const { id } = req.params;
      console.log(id);
      const ticketMessage = eliminarTicket(id);
      res.json(ticketMessage);
   } catch (error) {
      rex.status(500).json({ error: error.message });
   }
});

module.exports = router;

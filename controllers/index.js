require('dotenv').config();
const {
   listarTickets,
   crearTicket,
   modificarTicket,
   eliminarTicket,
} = require('../consultas/consultas');

const registrarTicket = async (req, res) => {
   try {
      const { titulo, descripcion, idTipo, idPrioridad, idEstado } = req.body;

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
};

const mostrarTickets = async (req, res) => {
   try {
      const { rowCount, rows, msg } = await listarTickets();
      console.log('Tickets: ', rowCount, msg);
      return res.json(rows);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
   }
};

const borrarTicket = async (req, res) => {
   try {
      const { id } = req.params;
      const { idTicket } = await eliminarTicket(id);
      console.log(idTicket);
      return res.json(idTicket);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

module.exports = { registrarTicket, mostrarTickets, borrarTicket };

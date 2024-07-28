require('dotenv').config();
const {
   listarTickets,
   crearTicket,
   modificarTicket,
   eliminarTicket,
} = require('../consultas/consultas');

//Controlador para registrar un nuevo ticket. Recibe los datos del body, llama la función crearTicket y los inserta en la base de datos. Devuelve los datos del ticket y un mensaje.
const registrarTicket = async (req, res) => {
   try {
      const { titulo, descripcion, idTipo, idPrioridad, idEstado } = req.body;
      const ticket = await crearTicket(
         titulo,
         descripcion,
         idTipo,
         idPrioridad,
         idEstado
      );
      const respuesta = {
         status: 'success',
         data: ticket,
         msg: 'Ticket creado exitosamente',
      };
      res.status(201).json(respuesta);
   } catch (error) {
      res.status(500).json({
         status: 'error',
         error: `Error al crear el ticket: ${error.message}`,
      });
   }
};

// Controlador para mostrar todos los ticket. Llama a la función listarTicket para obtener todos los ticket de la base de datos y devuelve una lista de tickets.
const mostrarTickets = async (req, res) => {
   try {
      const { rowCount, rows, msg } = await listarTickets();
      const respuesta = { rowCount, rows, msg };
      res.json(respuesta);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

// Controlador para borrar un ticket. Llama a la función eliminarTicket para borrar el ticket de la base de datos. Devuelve el ID del ticket eliminado.
const borrarTicket = async (req, res) => {
   try {
      const { id } = req.params;
      const respuesta = await eliminarTicket(id);
      return res.status(200).json(respuesta);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

// Controlador para modificar un ticket. Llama a la función modificarTicket para modificar el ticket de la base de datos. Devuelve el ticket modificado.
const editarTicket = async (req, res) => {
   try {
      const { prioridad, estado } = req.body;
      const { id } = req.params;
      const ticketMessage = await modificarTicket(id, prioridad, estado);
      res.status(200).json(ticketMessage);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

module.exports = {
   registrarTicket,
   mostrarTickets,
   borrarTicket,
   editarTicket,
};

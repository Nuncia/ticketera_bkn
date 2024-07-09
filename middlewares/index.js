// middlewares\index.js
const pool = require('../config/db');
// const { buscarTicket } = require('../consultas/consultas');

// Verifica que los campos titulo, descripcion, idTipo, idPrioridad e idEstado esten presentes en la solicitud. Si falta algun campo responde error 400. Si todos estan presentes, llama a next()
const validarPost = (req, res, next) => {
   try {
      const { titulo, descripcion, idTipo, idPrioridad, idEstado } = req.body;
      if (!titulo || !descripcion || !idTipo || !idPrioridad || !idEstado) {
         return res
            .status(400)
            .json({ error: 'Por favor, rellene todos los campos' });
      } else {
         next();
      }
   } catch (error) {
      next(error);
   }
};

// Verifica la existencia de un ticket dado un ID.
const validarTicket = async (req, res, next) => {
   try {
      const { id } = req.params;
      const ticket = await buscarTicket(id);
      if (!ticket) {
         return res.status(404).json({ error: 'Ticket no encontrado' });
      } else {
         next();
      }
   } catch (error) {
      return error;
   }
};

// Funcion para buscar un ticket.
// Busca un ticket con el ID proporcionado. Devuelve null si no se encuentra el ticket y si lo encuentra lo devuelve.
const buscarTicket = async (id) => {
   try {
      const query = 'SELECT * FROM ticket WHERE id = $1';
      const { rows, rowCount } = await pool.query(query, [id]);
      if (rows.length !== 0) {
         return rows[0];
      } else {
         return null;
      }
   } catch (error) {
      return error;
   }
};

module.exports = { validarPost, validarTicket };

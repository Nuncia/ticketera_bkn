const { buscarTicket } = require('../consultas/consultas');

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
      next(error);
   }
};

module.exports = { validarPost, validarTicket };

const pool = require('../config/db');

const listarTickets = async () => {
   try {
      // console.log('Consultando tickets...');
      const query = 'SELECT * FROM ticket';
      const { rows, rowCount } = await pool.query(query);
      const respuesta = {
         rowCount: rowCount,
         rows,
         msg: 'Listado de tickets',
      };
      return respuesta;
   } catch (error) {
      const respuesta = {
         rowCount: 0,
         rows: [],
         msg: `Error al obtener los Ticket: ${error.message}`,
      };
      return respuesta;
   }
};

const crearTicket = async ({
   titulo,
   descripcion,
   idTipo,
   idPrioridad,
   idEstado,
}) => {
   try {
      const query =
         'INSERT INTO ticket (id, titulo, descripcion, id_tipo, fechaHora, id_prioridad, id_estado) VALUES (DEFAULT, $1, $2, $3, NOW(), $4, $5) RETURNING *;';
      const values = [titulo, descripcion, idTipo, idPrioridad, idEstado];
      const { rowCount, rows } = await pool.query(query, values);
      const respuesta = {
         rowCount: rowCount,
         msg: 'Ticket creado',
         ticket: rows[0],
      };
      return respuesta;
   } catch (error) {
      const respuesta = {
         rowCount: 0,
         msg: error.message,
      };
      return respuesta;
   }
};

const modificarTicket = async (id, prioridad, estado) => {
   try {
      const consulta =
         'UPDATE ticket SET id_prioridad = $2, id_estado = $3 WHERE id= $1 RETURNING *';
      const values = [id, prioridad, estado];
      console.log(values);
      const { rowCount, rows } = await pool.query(consulta, values);
      const respuesta = {
         rowCount: rowCount,
         rows: rows,
         msg: 'Ticket modificado correctamente',
      };
      return respuesta;
   } catch (error) {
      const respuesta = {
         rowCount: 0,
         rows: [],
         msg: error.message,
      };
   }
};

const eliminarTicket = async (id) => {
   try {
      const consulta =
         'UPDATE  ticket SET id_estado = 3 WHERE id = $1 RETURNING *';
      const values = [id];
      const { rowCount, rows } = await pool.query(consulta, values);
      console.log(rows);
      const respuesta = {
         rowCount: rowCount,
         rows: rows.id,
         message: 'Ticket eliminado correctamente',
      };
      return respuesta;
   } catch (error) {
      const respuesta = {
         rowCount: 0,
         message: error.message,
      };
      return respuesta;
   }
};

const buscarTicket = async (id) => {
   try {
      console.log(id);
      const query = 'SELECT * FROM ticket WHERE id = $1';
      const { rows } = await pool.query(query, [id]);
      if (rows.length === 0) {
         return next();
      } else {
         return next('Ticket no existe en la base de datos');
      }
   } catch (error) {
      next(error);
   }
};

module.exports = {
   listarTickets,
   crearTicket,
   modificarTicket,
   eliminarTicket,
   buscarTicket,
};

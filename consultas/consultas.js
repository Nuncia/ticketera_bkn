const pool = require('../config/db');

const listarTickets = async () => {
   try {
      const query = 'SELECT * FROM ticket';
      const { rows } = await pool.query(query);
      console.log('rows', rows);
      return rows;
   } catch (error) {
      console.log('Error al obtener los Ticket:', error);
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
   const consulta =
      'UPDATE ticket SET prioridad = $2, estado = $3 WHERE id= 1$';
   const values = [id, prioridad, estado];
   const { rows } = await pool.query(consulta, values);
   console.log(rows);
   return rows;
};

const eliminarTicket = async (id) => {
   try {
      const consulta =
         'UPDATE  ticket SET id_estado = 3 WHERE id = $1 RETURNING *';
      const values = [id];
      const { rowCount, rows } = await pool.query(consulta, values);
      console.log(rows);
      const respuesta = {
         affectedRows: rowCount,
         rows,
         message: 'Ticket eliminado correctamente',
      };
      return respuesta;
   } catch (error) {
      const respuesta = {
         affectedRows: 0,
         rows: [],
         message: error.message,
      };
      return respuesta;
   }
};

// crearTicket('Ticket de', 'prueba', 1, 2, 3);

module.exports = {
   listarTickets,
   crearTicket,
   modificarTicket,
   eliminarTicket,
};

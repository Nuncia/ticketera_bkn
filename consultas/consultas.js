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

const crearTicket = async (
   titulo,
   descripcion,
   id_tipo,
   idPrioridad,
   idEstado
) => {
   console.log('TICKET: ', titulo, descripcion, id_tipo, idPrioridad, idEstado);
   try {
      const query =
         'INSERT INTO ticket ( id, titulo, descripcion, id_tipo, fechaHora, id_prioridad, id_estado) VALUES (DEFAULT, $1, $2, $3, NOW(), $4, $5) RETURNING *';
      const values = [
         titulo.titulo,
         titulo.descripcion,
         titulo.id_tipo,
         titulo.idPrioridad,
         titulo.idEstado,
      ];
      console.log('values: ', values);
      const { rowCount, rows } = await pool.query(query, values);
      return rows;
   } catch (error) {
      console.log('Error al crear el ticket:', error);
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

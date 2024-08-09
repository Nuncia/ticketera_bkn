const pool = require('../config/db');

// Función para listar todos los ticket.
// Consulta todos los ticket en la base de datos. y devuelve la respuesta del total de filas y los datos de los ticket.
const listarTickets = async () => {
   try {
      const query =
         "select k.id, k.titulo, k.descripcion, t.nombre_tipo as tipo, k.id_prioridad as prioridad, k.id_estado as estado, to_char(k.fechaHora, 'DD/MM/YYYY HH24:MI:SS') as fecha  from ticket AS k INNER JOIN tipo AS t ON id_tipo = t.id";
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

// Función para crear un nuevo ticket.
// Inserta un nuevo ticket en la base y devuelve el conteo y el nuevo ticket con sus DatabaseError.
const crearTicket = async (
   titulo,
   descripcion,
   idTipo,
   idPrioridad,
   idEstado
) => {
   try {
      const query =
         'INSERT INTO ticket (id, titulo, descripcion, id_tipo, fechaHora, id_prioridad, id_estado) VALUES (DEFAULT, $1, $2, $3, NOW(), $4, $5) RETURNING *;';
      const values = [titulo, descripcion, idTipo, idPrioridad, idEstado];
      const { rowCount, rows } = await pool.query(query, values);
      const respuesta = {
         rowCount: rowCount,
         msg: 'Ticket creado',
         ticket: rows,
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

// Función paraa modificar un ticket existente.
// Actualiza la prioridad y estado de un ticket en la base de datos y devuelve el ticket, un mensaje.
const modificarTicket = async (id, prioridad, estado) => {
   try {
      const consulta =
         'UPDATE ticket SET id_prioridad = $2, id_estado = $3, fechaHora = NOW() WHERE id= $1 RETURNING *';
      const values = [id, prioridad, estado];
      const { rowCount, rows } = await pool.query(consulta, values);
      const respuesta = {
         rowCount,
         rows,
         msg: 'Ticket modificado correctamente',
      };
      return respuesta;
   } catch (error) {
      const respuesta = {
         rowCount: 0,
         rows: [],
         msg: error.message,
      };
      return respuesta;
   }
};
// Funcion para eliminar un ticket.
// Actualiza el estado del ticket eliminado en la base de datos. Devuelve el ID del ticket y un mensaje.
const eliminarTicket = async (id) => {
   try {
      const consulta = 'DELETE FROM ticket WHERE id = $1';
      const values = [id];
      const { rowCount } = await pool.query(consulta, values);
      const respuesta = {
         rowCount: rowCount,
         msg: 'Ticket eliminado correctamente',
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

module.exports = {
   listarTickets,
   crearTicket,
   modificarTicket,
   eliminarTicket,
};

const pool = require('../config/db');

// Función para listar todos los ticket.
// Consulta todos los ticket en la base de datos. y devuelve la respuesta del total de filas y los datos de los ticket.
const listarTickets = async () => {
   try {
      // console.log('Consultando tickets...');
      const query =
         "select t.id, t.titulo, t.descripcion, p.nombre_tipo as tipo, d.nombre_prioridad as prioridad, e.nombre_estado as estado, to_char(t.fechaHora, 'DD/MM/YYYY HH24:MI:SS') as fecha from ticket as t left JOIN tipo as p ON t.id_tipo = p.id left JOIN prioridad as d ON t.id_prioridad = d.id left JOIN estado as e ON t.id_estado = e.id order by t.id ASC;";
      console.log(query);
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
      // console.log('values: ', values);
      // console.log('query', query);
      const { rowCount, rows } = await pool.query(query, values);
      const respuesta = {
         rowCount: rowCount,
         msg: 'Ticket creado',
         ticket: rows,
      };
      // console.log(respuesta);
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
      return respuesta;
   }
};
// Funcion para eliminar un ticket.
// Actualiza el estado del ticket eliminado en la base de datos. Devuelve el ID del ticket y un mensaje.
const eliminarTicket = async (id) => {
   try {
      const consulta =
         'UPDATE ticket SET id_estado = 3 WHERE id = $1 RETURNING *';
      const values = [id];
      const { rows, rowCount } = await pool.query(consulta, values);
      const respuesta = {
         rowCount: rowCount,
         rows: rows,
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

// listarTickets();

module.exports = {
   listarTickets,
   crearTicket,
   modificarTicket,
   eliminarTicket,
};

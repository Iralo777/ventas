const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const { json } = require('body-parser');



// ■■■■■■■■ getMultiple ■■■■■■■■  Obtener una lista de todos los clientes
async function getMultiple(page = 1){
    const rows = await db.query(`SELECT * FROM cliente`);
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
      data,
      meta
    };
}

// ■■■■■■■■ getOneCliente ■■■■■■■■ Obtener un cliente concreto enviando su ID
//💩💩💩💩💩💩 no me funciona lo de abajo
/**
 * Funcion para recuperar todos los comerciales disponibles.
 * @returns {Array} lista de todos los comerciales
 */
async function getOneCliente(id) {
    const rows = await db.query('SELECT * FROM cliente WHERE id=' + id + ';');
    const data = helper.emptyOrRows(rows);
    return data;
}

// ■■■■■■■■ createCliente ■■■■■■■■ Crear un cliente nuevo. 
// Los datos del cliente (todos menos id) se envían en un JSON
async function createCliente(cliente) {
    let sql = "INSERT INTO `cliente` (`nombre`, `apellido1`, `apellido2`, `ciudad`, `categoria`) VALUES (";
    sql += "'"+cliente.nombre+
          "','"+cliente.apellido1+
          "','"+cliente.apellido2+
          "','"+cliente.ciudad+
          "','"+cliente.categoria+"'";
    sql += ");";
    
    const rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);
    return { data };
}

// ■■■■■■■■ getPedidosCliente ■■■■■■■■ Buscar pedidos realizados por el cliente mediante id
async function getPedidosCliente(id) {
    const rows = await db.query('SELECT p.id AS id_pedido, p.total, p.fecha, p.id_cliente FROM pedido p JOIN cliente c ON c.id=p.id_cliente AND c.id=' + id + ';');
    const data = helper.emptyOrRows(rows);
    return data;
}
module.exports = {
    getMultiple,
    getOneCliente,
    createCliente,
    // Modificar, eliminar, y otras funciones si son necesarias
    getPedidosCliente
};

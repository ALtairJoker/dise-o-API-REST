const { obtenerListadoJoyasBD } = require("./consultas");
const pool = require("../modules/conexion");

const obtenerListadoJoyas = async ({
  limits = 10,
  order_by = "id_ASC",
  page = 1,
}) => {
  const resultado = await obtenerListadoJoyasBD(limits, order_by, page);
  let resultado_final = [];
  if (resultado.length > 0) {
    let results = [];
    let stockTotal = 0;
    resultado.forEach((element) => {
      let objResultado = {
        name: element.nombre,
        href: `/joyas/joya/${element.id}`,
      };
      stockTotal += element.stock;
      results.push(objResultado);
    });

    resultado_final = {
      totalJoyas: resultado.length,
      stockTotal: stockTotal,
      results: results,
    };
  }
  return resultado_final;
};

const obtenerListadoJoyasFiltrado = async ({
  precio_max,
  precio_min,
  categoria,
  metal,
}) => {
  let filtros = [];
  const values = [];

  const agregarFiltro = (campo, comparador, valor) => {
    values.push(valor);
    const { length } = filtros;
    filtros.push(`${campo} ${comparador} $${length + 1}`);
  };

  if (precio_max) agregarFiltro("precio", "<=", precio_max);
  if (precio_min) agregarFiltro("precio", ">=", precio_min);
  if (categoria) agregarFiltro("categoria", "=", categoria);
  if (metal) agregarFiltro("metal", ">=", metal);
  let consulta = "SELECT * FROM inventario";
  if (filtros.length > 0) {
    filtros = filtros.join(" AND ");
    consulta += ` WHERE ${filtros}`;
  }
  const { rows: inventario } = await pool.query(consulta, values);
  return inventario;
};

module.exports = { obtenerListadoJoyas, obtenerListadoJoyasFiltrado };

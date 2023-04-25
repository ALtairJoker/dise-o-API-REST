const format = require("pg-format");
const pool = require("../modules/conexion");

const obtenerListadoJoyasBD = async (limits, order_by, page) => {
  try {
    let [campo, direccion] = order_by.split("_");
    direccion = direccion.toUpperCase();
    const offset = (page - 1) * limits;
    const consulta_formateada = format(
      "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
      campo,
      direccion,
      limits,
      offset
    );
    const { rows } = await pool.query(consulta_formateada);
    return rows;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = { obtenerListadoJoyasBD };

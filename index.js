const express = require("express");
const cors = require("cors");
const {
  obtenerListadoJoyas,
  obtenerListadoJoyasFiltrado,
} = require("./modules/controlador");

const app = express();

app.listen(3000, console.log("Server ON"));

app.use(cors());
app.use(express.json());

app.get("/joyas", async (req, res) => {
  const queryStrings = req.query;
  const listado_joyas = await obtenerListadoJoyas(queryStrings);
  if (!listado_joyas) {
    res.status(500).send("Error al obtener el listado");
  } else {
    res.json(listado_joyas);
  }
});

app.get("/joyas/filtros", async (req, res) => {
  try {
    console.log(req.query);
    const queryStrings = req.query;
    const inventario = await obtenerListadoJoyasFiltrado(queryStrings);
    res.json(inventario);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

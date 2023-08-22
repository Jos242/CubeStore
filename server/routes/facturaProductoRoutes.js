//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//controller para los métodos definidos
const facturaProductoController = require("../controllers/facturaProductoController");

//Definición de rutas para generos

router.put('/:id',facturaProductoController.update);


module.exports = router;
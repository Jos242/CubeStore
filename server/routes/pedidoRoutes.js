//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//controller para los métodos definidos
const pedidoController = require("../controllers/pedidoController");

//Definición de rutas para generos

router.get('/',pedidoController.get);

router.get('/:id',pedidoController.getByIdVendedor);

//router.get("/:id", generoController.getById);

module.exports = router;
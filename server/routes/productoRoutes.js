//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//controller para los métodos definidos
const productoController = require("../controllers/productoController");

//Definición de rutas para generos
router.get("/", productoController.get);

//router.get("/:id", generoController.getById);

module.exports = router;
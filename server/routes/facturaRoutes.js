//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//controller para los métodos definidos
const facturaController = require("../controllers/facturaController");

//Definición de rutas para generos
router.get("/", facturaController.get);

//router.get("/:id", generoController.getById);

module.exports = router;
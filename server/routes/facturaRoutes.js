//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//controller para los métodos definidos
const facturaController = require("../controllers/facturaController");

//Definición de rutas para generos
router.get("/", facturaController.get);

router.get('/:id',facturaController.getById);

router.get('/all/:id',facturaController.getByClienteId);

router.post("/", facturaController.create);

//router.get("/:id", generoController.getById);

module.exports = router;
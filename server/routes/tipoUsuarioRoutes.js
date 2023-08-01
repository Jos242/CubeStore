//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Rol controller para los métodos definidos
const tipoUsuarioController = require("../controllers/tipoUsuarioController");

router.get("/", tipoUsuarioController.get);

router.get("/:id", tipoUsuarioController.getById);

module.exports = router;
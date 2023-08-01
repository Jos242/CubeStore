//Express para agregar las rutas
const express = require("express");
const router = express.Router();


//Usuario controller para los métodos definidos
const usuarioController = require("../controllers/usuarioController");

router.post("/login", usuarioController.login);

router.post("/registrar", usuarioController.register);

module.exports = router;
//Express para agregar las rutas
const express = require("express");
const router = express.Router();


//Usuario controller para los métodos definidos
const usuarioController = require("../controllers/usuarioController");

router.get("/all", usuarioController.get);

router.post("/login", usuarioController.login);

router.post("/registrar", usuarioController.register);

router.put("/:id", usuarioController.update);

module.exports = router;
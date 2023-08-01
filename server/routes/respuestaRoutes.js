//Express para agregar las rutas
const express = require("express");
const router = express.Router();


const respuestaController = require("../controllers/respuestaController");

router.post("/", respuestaController.create);

module.exports = router;
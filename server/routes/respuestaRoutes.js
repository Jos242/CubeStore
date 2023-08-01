//Express para agregar las rutas
const express = require("express");
const router = express.Router();


const respuestaController = require("../controllers/respuestaController");
const auth=require("../middleware/auth");

router.post("/", auth.grantRole(["ADMIN","CLIENTE"]), respuestaController.create);

module.exports = router;
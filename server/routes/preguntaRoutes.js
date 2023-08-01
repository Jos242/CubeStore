//Express para agregar las rutas
const express = require("express");
const router = express.Router();


const preguntaController = require("../controllers/preguntaController");
const auth=require("../middleware/auth");   

router.post("/", auth.grantRole(["ADMIN","CLIENTE"]), preguntaController.create);

module.exports = router;
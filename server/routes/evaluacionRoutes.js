//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//controller para los métodos definidos
const evaluacionController = require("../controllers/evaluacionController");

//Definición de rutas para generos
router.get("/", evaluacionController.get);

router.get('/evaluador/:id', evaluacionController.getByEvaluadorId);

router.get('/evaluado/:id', evaluacionController.getByEvaluadoId);

router.post('/',evaluacionController.create);


module.exports = router;
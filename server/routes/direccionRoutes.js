//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//controller para los métodos definidos
const direccionController = require("../controllers/direccionController");

//Definición de rutas para generos
router.get("/", direccionController.get);

router.get('/:id', direccionController.getById);

router.get('/usuario/:id', direccionController.getByUsuarioId);

router.post('/',direccionController.create);

router.put('/:id',direccionController.update);


module.exports = router;
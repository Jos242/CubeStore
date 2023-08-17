//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//controller para los métodos definidos
const tarjetaController = require("../controllers/tarjetaController");

//Definición de rutas para generos
router.get("/", tarjetaController.get);

router.get('/:id', tarjetaController.getById);

router.get('/usuario/:id', tarjetaController.getByUsuarioId);

router.post('/',tarjetaController.create);

router.put('/:id',tarjetaController.update);


module.exports = router;
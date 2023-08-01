//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//controller para los métodos definidos
const atributoController = require("../controllers/atributoController");

//Definición de rutas para generos
router.get("/", atributoController.get);

router.get('/:id', atributoController.getById);

// router.get('/all/:id',atributoController.getByVendedorId);

// router.post('/',atributoController.create);

// router.put('/:id',atributoController.update);


module.exports = router;
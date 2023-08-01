//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//controller para los métodos definidos
const categoriaController = require("../controllers/categoriaController");

//Definición de rutas para generos
router.get("/", categoriaController.get);

router.get('/:id', categoriaController.getById);

// router.get('/all/:id',atributoController.getByVendedorId);

// router.post('/',atributoController.create);

// router.put('/:id',atributoController.update);


module.exports = router;
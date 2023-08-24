//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//controller para los métodos definidos
const productoController = require("../controllers/productoController");
const auth=require("../middleware/auth");

//Definición de rutas para generos
router.get("/", productoController.get);

router.get('/top', productoController.getTopProds);

router.get('/:id', productoController.getById);

router.get('/all/:id',productoController.getByVendedorId);

router.get('/top/:id', productoController.getTopProdById);

router.get('/comprador/:id', productoController.getTopCompradorByVend);

router.post('/',productoController.create);

router.put('/:id',productoController.update);

router.put('/cantidad/:id',productoController.updateCantidad);




module.exports = router;
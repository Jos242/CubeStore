//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//controller para los métodos definidos
const productoController = require("../controllers/productoController");
const auth=require("../middleware/auth");

//Definición de rutas para generos
router.get("/", productoController.get);

router.get('/:id', productoController.getById);

router.get('/all/:id',auth.grantRole(["VENDEDOR"]),productoController.getByVendedorId);

router.post('/',auth.grantRole(["ADMIN","VENDEDOR"]),productoController.create);

router.put('/:id',auth.grantRole(["ADMIN","VENDEDOR"]),productoController.update);


module.exports = router;
//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const ordenController = require("../controllers/ordenController");

//Definición de rutas para ordenes
router.get("/", ordenController.get);

router.post("/", ordenController.create);

// router.get("/vProductoTop",ordenController.getVentaProductoTop);

router.get("/:id", ordenController.getById);

// router.get("/vProducto/:mes", ordenController.getVentaProductoMes);

module.exports = router;
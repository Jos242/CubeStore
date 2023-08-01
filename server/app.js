const dotEnv = require('dotenv');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require('fs');

const app = express();
const prism = new PrismaClient();

//---Archivos de rutas---
//lineas del ejemplo de la profe
const facturaRouter = require("./routes/facturaRoutes");
const pedidoRouter = require("./routes/pedidoRoutes");
const productoRouter = require("./routes/productoRoutes");
const usuarioRouter = require("./routes/usuarioRoutes");
const preguntaRouter = require("./routes/preguntaRoutes");
const respuestaRouter = require("./routes/respuestaRoutes");
const tipoUsuarioRouter = require("./routes/tipoUsuarioRoutes");
const atributoRouter = require("./routes/atributoRoutes");
const categoriaRouter = require("./routes/categoriaRoutes");
// const ordenRouter = require("./routes/ordenRoutes");
// const generoRouter = require("./routes/generoRoutes");
// const rolRouter = require("./routes/rolRoutes");
// const userRouter = require("./routes/userRoutes");


// Acceder a la configuracion del archivo .env
dotEnv.config();
// Puerto que escucha por defecto 3000 o definido .env
const port = process.env.PORT || 3000;
// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());
// Middleware para loggear las llamadas al servidor
app.use(logger('dev'));
// Middleware para gestionar Requests y Response json
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//---- Definir rutas ---- 
//lineas de la profe
app.use("/factura/", facturaRouter);
app.use("/pedido/", pedidoRouter);
app.use("/producto/", productoRouter);
app.use("/usuario/", usuarioRouter);
app.use("/pregunta/", preguntaRouter);
app.use("/respuesta/", respuestaRouter);
app.use("/atributo/", atributoRouter);
app.use("/categoria/", categoriaRouter);
app.use("/tipoUsuario/", tipoUsuarioRouter);
// app.use("/orden/", ordenRouter);
// app.use("/genero/", generoRouter);
// app.use("/rol/", rolRouter); 
// app.use("/user/", userRouter);

// Servidor
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log('Presione CTRL-C para deternerlo\n');
});

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    const id = req.params.id; 

    console.log(productoRouter.get());
    const folderPath = `images/${id}`;
    
    fs.readdir(folderPath)
    .then(files => {
    const unlinkPromises = files.map(file => {
      const filePath = path.join(folderPath, file)
      return fs.unlink(filePath)
    })

    return Promise.all(unlinkPromises)
    }).catch(err => {
      console.error(`Something wrong happened removing files of ${folderPath}`)
    })

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    callBack(null, folderPath)
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`)
  }
});

const upload = multer({ storage: storage });

app.post("/multiplefiles/:id", upload.array("files"), function (req, res, next) {
  const files = req.files;
  if (Array.isArray(files) && files.length > 0) {
    res.json(req.files);
  } else {
    res.status(400);
    throw new Error("No file");
  }
});

app.get('/images/:id', (req, res) => {
  const { id } = req.params;

  // Assuming each ID corresponds to a subfolder in the 'images' folder
  const folderPath = `images/${id}`;

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading images folder:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const imageUrls = files.map((file) => "data:image/gif;base64,"+fs.readFileSync(`./images/${id}/${file}`, 'base64'));
      res.json(imageUrls);
    }
  });
});
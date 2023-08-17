const dotEnv = require('dotenv');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require('fs-extra');

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

const direccionRouter = require("./routes/direccionRoutes");
const tarjetaRouter = require("./routes/tarjetaRoutes");
const ordenRouter = require("./routes/ordenRoutes");



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
app.use("/direccion/", direccionRouter);
app.use("/tarjeta/", tarjetaRouter);
app.use("/orden/", ordenRouter);

// app.use("/genero/", generoRouter);
// app.use("/rol/", rolRouter); 
// app.use("/user/", userRouter);

cont = 0;

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    const id = req.params.id; 
    const folderPath = `./images/${id}`;
    
    if (fs.existsSync(folderPath)) {
      if(cont==0){
        fs.emptyDir(folderPath)
        .then(() => {
          console.log('Folder and all its contents removed successfully.');
        })
        .catch((err) => {
          console.error('Error removing the folder:');
        });
      }
      cont++;
    } else {
        fs.mkdir(folderPath, (err) => {
          if (err) {
            console.error('Error creating the folder:');
          } else {
            console.log('Folder created successfully.');
          }
        });
      cont++;
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
  cont = 0;
});

app.get('/images/all', async (req, res) => {
  images = await getImages([], 0);
  res.json(images);
});

async function getImages(imageUrlsList, id) {
  folderPath = `images/${id}`;
  if(fs.existsSync(folderPath)){
    const files = await fs.promises.readdir(folderPath);
    
    const imageUrls = await Promise.all(files.map(async (file) => {
      const data = await fs.promises.readFile(`./images/${id}/${file}`, 'base64');
      return "data:image/gif;base64," + data;
    }));

    imageUrlsList.push(imageUrls);
    return getImages(imageUrlsList, ++id);
  } else {
    return imageUrlsList;
  }
}

// Servidor
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log('Presione CTRL-C para deternerlo\n');
});
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Crear un respuesta
module.exports.create = async (request, response, next) => {
  let respuesta = request.body;
  const newRespuesta = await prisma.respuesta.create({
    data: {
        usuario: {
            connect: {
                id: parseInt(respuesta.idUsuario), 
            },
        },
        pregunta: {
            connect: {
                id: parseInt(respuesta.idPregunta), 
            },
        },
        descripcion: respuesta.descripcion
    },
  });
  response.json(newRespuesta);
};
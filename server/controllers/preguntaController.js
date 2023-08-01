const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Crear un pregunta
module.exports.create = async (request, response, next) => {
  let pregunta = request.body;
  const newPregunta = await prisma.pregunta.create({
    data: {
        usuario: {
            connect: {
                id: parseInt(pregunta.idUsuario),
            },
        }, 
        producto: {
            connect: {
                id: parseInt(pregunta.idProducto),
            },
        },
        descripcion: pregunta.descripcion
    },
  });
  response.json(newPregunta);
};
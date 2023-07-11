const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const productos = await prisma.producto.findMany({
    // orderBy: {
    //     idCategoria: 'asc',
    //   },
    // include: {
    //     atributos: true,
    //     preguntas: {
    //         respuestas: {
    //             descripcion: true,
    //             fechaExp: true
    //         }
    //     }
    // }
  });
  response.json(productos);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const orden = await prisma.orden.findUnique({
    where: { id: id },
    include: {
      usuario: true,
      videojuegos: {
        select: {
          videojuego: true,
          cantidad: true,
        },
      },
    },
  });
  response.json(orden);
};
//Crear
module.exports.create = async (request, response, next) => {};
//Actualizar
module.exports.update = async (request, response, next) => {};
const { PrismaClient } = require('@prisma/client');
const { profileEnd } = require('console');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const atributos = await prisma.atributo.findMany({
    orderBy: {
        id: 'asc',
      },
  });
  response.json(atributos);
};

// Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const atributo = await prisma.atributo.findUnique({
    where: { id: id },
  });
  response.json(atributo);
};
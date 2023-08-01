const { PrismaClient } = require('@prisma/client');
const { profileEnd } = require('console');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const categorias = await prisma.categoria.findMany({
    orderBy: {
        id: 'asc',
      },
  });
  response.json(categorias);
};

// Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const categoria = await prisma.categoria.findUnique({
    where: { id: id },
  });
  response.json(categoria);
};
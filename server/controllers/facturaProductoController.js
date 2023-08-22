const { PrismaClient, Pedido } = require('@prisma/client');
const { profileEnd } = require('console');
const prisma = new PrismaClient();

module.exports.update = async (request, response, next) => {
    let item = request.body;
    let idItem = parseInt(request.params.id);
  
    const newItem = await prisma.facturaProducto.update({
      where: {
        id: idItem,
      },
      data: {
        estado: Pedido[item.estado]
      },
    });
    response.json(newItem);
};
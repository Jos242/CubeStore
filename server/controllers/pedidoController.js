const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const pedidos = await prisma.facturaProducto.findMany({
    include: { 
      producto: true
    }
  });
  response.json(pedidos);
};

module.exports.getByIdVendedor = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const pedidos = await prisma.facturaProducto.findMany({
      where: { producto: { idUsuario : id} },
      orderBy: {
          idFactura: 'asc',
        },
      include: { 
        producto: true
      }
    });
    response.json(pedidos);
};
//Crear
module.exports.create = async (request, response, next) => {};
//Actualizar
module.exports.update = async (request, response, next) => {};

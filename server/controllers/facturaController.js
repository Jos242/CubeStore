const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const facturas = await prisma.factura.findMany({
    include: {
        usuario: true,
        direccion: true,
        tarjeta: {
          select: {
            proveedor: true
          }
        },
        productos: {  
          select: {
            producto: true,
            estado: true
          }
        }
    }
  });
  response.json(facturas);
};
//Obtener por ClienteId
module.exports.getByClienteId = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const factura = await prisma.factura.findMany({
    where: { idUsuario: id },
    include: { 
        usuario: true,
        direccion: true,
        tarjeta: {
          select: {
            proveedor: true
          }
        },
        productos: {
          select: {
            producto: true,
            estado: true
          }
        }
    }
  });
  response.json(factura);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const factura = await prisma.factura.findUnique({
    where: { id: id },
    include: {
        usuario: true,
        direccion: true,
        tarjeta: {
          select: {
            tipo: true,
            proveedor: true
          }
        },
        productos: {
          select: {
            producto: true,
            estado: true
          }
        }
    }
  });
  response.json(factura);
};
//Crear
module.exports.create = async (request, response, next) => {};
//Actualizar
module.exports.update = async (request, response, next) => {};

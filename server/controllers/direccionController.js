const { PrismaClient } = require('@prisma/client');
const { profileEnd } = require('console');
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const direcciones = await prisma.direccion.findMany({
        orderBy: {
            id: 'asc',
          },
    });
    response.json(direcciones);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const direccion = await prisma.direccion.findUnique({
    where: { id: id },
  });
  response.json(direccion);
};

module.exports.getByUsuarioId = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const direccion = await prisma.direccion.findMany({
    where: { idUsuario: id },
  });
  response.json(direccion);
};

module.exports.create = async (request, response, next) => {
let direccion = request.body;
const newDireccion = await prisma.direccion.create({
  data: {
    provincia: direccion.provincia.value,
    canton: direccion.canton.value,
    distrito: direccion.distrito.value,
    direccionExacta: direccion.direccionExacta,
    codigoPostal: direccion.codigoPostal, 
    telefono: direccion.telefono, 
    idUsuario: direccion.idUsuario, 
  },
})
response.json(newDireccion);
};

module.exports.update = async (request, response, next) => {
let direccion = request.body;
let idDireccion = parseInt(request.params.id);

const newDireccion = await prisma.direccion.update({
  where: {
    id: idDireccion,
  },
  data: {
    provincia: direccion.provincia.value,
    canton: direccion.canton.value,
    distrito: direccion.distrito.value,
    direccionExacta: direccion.direccionExacta,
    codigoPostal: direccion.codigoPostal, 
    telefono: direccion.telefono, 
    idUsuario: direccion.idUsuario, 
  },
});
response.json(newDireccion);
};
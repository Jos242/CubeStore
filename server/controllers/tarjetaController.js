const { PrismaClient } = require('@prisma/client');
const { profileEnd } = require('console');
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const tarjetas = await prisma.tarjeta.findMany({
        orderBy: {
            id: 'asc',
          },
    });
    response.json(tarjetas);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const tarjeta = await prisma.tarjeta.findMany({
    where: { id: id },
  });
  response.json(tarjeta);
};

module.exports.getByUsuarioId = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const tarjeta = await prisma.tarjeta.findMany({
    where: { idUsuario: id },
  });
  response.json(tarjeta);
};

module.exports.create = async (request, response, next) => {
let tarjeta = request.body;
const newTarjeta = await prisma.tarjeta.create({
  data: {
    idUsuario: tarjeta.idUsuario,
    tipo: tarjeta.tipo,
    proveedor: tarjeta.proveedor,
    nombre: tarjeta.nombre,
    numero: tarjeta.numero, 
    fechaExp: tarjeta.fechaExp, 
  },
})
response.json(newTarjeta);
};

module.exports.update = async (request, response, next) => {
let tarjeta = request.body;
let idTarjeta = parseInt(request.params.id);

const newTarjeta = await prisma.tarjeta.update({
  where: {
    id: idTarjeta,
  },
  data: {
    idUsuario: tarjeta.idUsuario,
    tipo: tarjeta.tipo,
    proveedor: tarjeta.proveedor,
    nombre: tarjeta.nombre,
    numero: tarjeta.numero, 
    fechaExp: tarjeta.fechaExp, 
  },
});
response.json(newTarjeta);
};
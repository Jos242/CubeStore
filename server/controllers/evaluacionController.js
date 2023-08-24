const { PrismaClient } = require('@prisma/client');
const { profileEnd } = require('console');
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const evaluaciones = await prisma.evaluacion.findMany({
        orderBy: {
            id: 'asc',
          },
    });
    response.json(evaluaciones);
};

module.exports.getByEvaluadorId = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const evaluacion = await prisma.evaluacion.findMany({
    where: { idUsuarioEvaluador: id },
  });
  response.json(evaluacion);
};

module.exports.getByEvaluadoId = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const evaluacion = await prisma.evaluacion.findMany({
    where: { idUsuarioEvaluado: id },
  });
  response.json(evaluacion);
};

module.exports.create = async (request, response, next) => {
let evaluacion = request.body;
const newEvaluacion = await prisma.evaluacion.create({
  data: {
    idUsuarioEvaluador: evaluacion.idUsuarioEvaluador, 
    idUsuarioEvaluado:  evaluacion.idUsuarioEvaluado,
    idFactura:  evaluacion.idFactura,
    calificacion:  evaluacion.calificacion,
    mensaje:  evaluacion.mensaje,
    evaluador:  evaluacion.evaluador,
  },
})
response.json(newEvaluacion);
};
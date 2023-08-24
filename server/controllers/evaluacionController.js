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

module.exports.getTopEvaluators = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const topUsers = await prisma.usuario.findMany({
    where: {
      evaluacionesEvaluado: {
        some: {
          evaluador: 1
        }
      }
    },
    include: {
      evaluacionesEvaluado: {
        select: {
          calificacion: true
        }
      }
    }
  });

  const usersWithAverageRating = topUsers.map(user => ({
    ...user,
    averageRating: user.evaluacionesEvaluado.reduce((total, evaluacion) => {
      return total + evaluacion.calificacion;
    }, 0) / user.evaluacionesEvaluado.length
  }));

  usersWithAverageRating.sort((a, b) => b.averageRating - a.averageRating);

  const top5Users = usersWithAverageRating.slice(0, 5);
  response.json(top5Users);
};

module.exports.getTopWorstRated = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const topUsers = await prisma.usuario.findMany({
    where: {
      evaluacionesEvaluado: {
        some: {
          evaluador: 1
        }
      }
    },
    include: {
      evaluacionesEvaluado: {
        select: {
          calificacion: true
        }
      }
    }
  });

  // Calculate the average rating for each user
  const usersWithAverageRating = topUsers.map(user => ({
    ...user,
    averageRating: user.evaluacionesEvaluado.length > 0
      ? user.evaluacionesEvaluado.reduce((total, evaluacion) => {
          return total + evaluacion.calificacion;
        }, 0) / user.evaluacionesEvaluado.length
      : 0
  }));

  // Sort users by average rating in ascending order
  usersWithAverageRating.sort((a, b) => a.averageRating - b.averageRating);

  // Get the top 3 worst-rated users
  const top3WorstRatedUsers = usersWithAverageRating.slice(0, 3);
  response.json(top3WorstRatedUsers);
};

module.exports.getEvByCount = async (request, response, next) => {
  let id = parseInt(request.params.id);

  const userEvaluaciones = await prisma.usuario.findUnique({
    where: {
      id
    },
    include: {
      evaluacionesEvaluado: {
        select: {
          calificacion: true
        }
      }
    }
  });

  const evaluaciones = userEvaluaciones.evaluacionesEvaluado;

  // Count the occurrences of each rating
  const ratingCounts = evaluaciones.reduce((counts, evaluacion) => {
    const calificacion = evaluacion.calificacion;
    counts[calificacion] = (counts[calificacion] || 0) + 1;
    return counts;
  }, {});

  // Sort ratings by count in descending order
  const sortedRatings = Object.keys(ratingCounts).sort((a, b) => ratingCounts[b] - ratingCounts[a]);

  // Create an array of evaluations with sorted ratings and their counts
  const sortedEvaluaciones = sortedRatings.map(calificacion => ({
    calificacion: parseInt(calificacion),
    count: ratingCounts[calificacion]
  }));

  response.json(sortedEvaluaciones);
};



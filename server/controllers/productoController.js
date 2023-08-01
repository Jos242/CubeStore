const { PrismaClient } = require('@prisma/client');
const { profileEnd } = require('console');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const productos = await prisma.producto.findMany({
    orderBy: {
        idCategoria: 'asc',
      },
    include: { 
        categoria: true,
        usuario: true,
        atributos: true,
        preguntas: {
            select:{
                idUsuario: true,
                idProducto: true,
                descripcion: true,
                fechaExp: true,
                respuestas: true,
            }
            
        }
    }
  });
  response.json(productos);
};

// Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const producto = await prisma.producto.findUnique({
    where: { id: id },
    include: { 
        categoria: true,
        usuario: true,
        atributos: true,
        preguntas: {
            select:{
                idUsuario: true,
                idProducto: true,
                descripcion: true,
                fechaExp: true,
                respuestas: true,
            }
            
        }
    }
  });
  response.json(producto);
};

// Obtener por Vendedor
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const producto = await prisma.producto.findUnique({
      where: { id: id },
      include: { 
          categoria: true,
          usuario: true,
          atributos: true,
          preguntas: {
              select:{
                  idUsuario: true,
                  idProducto: true,
                  descripcion: true,
                  fechaExp: true,
                  usuario: true,
                  respuestas: {
                    select:{
                        idUsuario: true,
                        idPregunta: true,
                        descripcion: true,
                        fecha: true,
                        usuario: true
                    }
                    
                }
              }
              
          }
      }
    });
    response.json(producto);
  };

  module.exports.getByVendedorId = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const producto = await prisma.producto.findMany({
      where: { idUsuario: id },
      include: { 
        categoria: true,
        usuario: true,
        atributos: true,
        // preguntas: {
        //     select:{
        //         idUsuario: true,
        //         idProducto: true,
        //         descripcion: true,
        //         fechaExp: true,
        //         respuestas: true,
        //     }
            
        // }
    }
    });
    response.json(producto);
  };


//Crear
module.exports.create = async (request, response, next) => {
  let producto = request.body;
  const newProducto = await prisma.producto.create({
    data: {
      usuario: {
        connect: { id: parseInt(producto.idUsuario) },
      },
      categoria: {
        connect: { id: parseInt(producto.idCategoria) },
      },
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad: parseInt(producto.cantidad),
      estado: producto.estado, 
      atributos: {
        connect: producto.atributos,
      }
    }
  })
  response.json(newProducto);
};
//Actualizar
module.exports.update = async (request, response, next) => {
  let producto = request.body;
  let idProducto = parseInt(request.params.id);
  //Obtener videojuego viejo
  const productoViejo = await prisma.producto.findUnique({
    where: { id: idProducto },
    include: {
      atributos: {
        select:{
          id:true
        }
      }
    }
  });

  const newProducto = await prisma.producto.update({
    where: {
      id: idProducto,
    },
    data: {
      // idUsuario: producto.idUsuario,
      // idCategoria: producto.idCategoria,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad: parseInt(producto.cantidad),
      estado: producto.estado, 
      // atributos: {
      //   disconnect: productoViejo.atributos,
      //   connect: producto.atributos,
      // },
    },
  });
  response.json(newProducto);
};
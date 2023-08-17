const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const ordenes = await prisma.orden.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      usuario: true,
      productos: {
        select: {
          producto: true,
          cantidad: true,
        },

      },
    },
  });
  response.json(ordenes);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const orden = await prisma.orden.findUnique({
    where: { id: id },
    include: {
      usuario: true,
      productos: {
        select: {
          producto: true,
          cantidad: true,
        },

      },
    },
  });
  response.json(orden);
};
//Crear
module.exports.create = async (request, response, next) => {
  let infoOrden=request.body;
  const newOrden =await prisma.orden.create({
    data:{
      idUsuario:infoOrden.idUsuario,
      subtotal: infoOrden.subtotal,
      estado: infoOrden.estado,
      productos:{
        createMany:{
          //[{videojuegoId, cantidad}]
          data: infoOrden.productos
        }
      }
    }   
  })
  response.json(newOrden)
};

// //Actualizar
// module.exports.update = async (request, response, next) => {
//     let orden = request.body;
//     let idOrden = parseInt(request.params.id);
//     //Obtener videojuego viejo
//     const productoViejo = await prisma.producto.findUnique({
//       where: { id: idProducto },
//       include: {
//         atributos: {
//           select:{
//             id:true
//           }
//         }
//       }
//     });
  
//     const newProducto = await prisma.producto.update({
//       where: {
//         id: idProducto,
//       },
//       data: {
//         // idUsuario: producto.idUsuario,
//         //idCategoria: producto.idCategoria,
//         nombre: producto.nombre,
//         descripcion: producto.descripcion,
//         precio: producto.precio,
//         cantidad: parseInt(producto.cantidad),
//         estado: producto.estado, 
//         atributos: {
//           //Generos tiene que ser {id:valor}
//           disconnect:productoViejo.atributos,
//           connect: producto.atributos,
//         },
//       },
//     });
//     response.json(newProducto);
//   };

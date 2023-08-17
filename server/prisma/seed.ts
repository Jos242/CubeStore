import { Estado, PrismaClient } from '@prisma/client';
import { usuarios } from './seeds/usuarios';
import { categorias } from './seeds/categorias';
import { direcciones } from './seeds/direcciones';
import { evaluaciones } from './seeds/evaluaciones';
import { facturas } from './seeds/facturas';
import { atributos } from './seeds/atributos';
import { facturaproductos } from './seeds/facturaproductos';
import { preguntas } from './seeds/preguntas';
import { respuestas } from './seeds/respuestas';
import { tarjetas } from './seeds/tarjetas';
import { ordenes } from './seeds/ordenes';
import { ordenproductos } from './seeds/ordenproductos';

const prisma = new PrismaClient();

async function main() {
  
    await prisma.usuario.createMany({
        data: usuarios
      });   
      await prisma.categoria.createMany({
        data: categorias
      });
      await prisma.atributo.createMany({
        data: atributos
      });
      await prisma.tarjeta.createMany({
        data: tarjetas
      });  
      await prisma.direccion.createMany({
        data: direcciones 
      });
      await prisma.producto.create({
        //1
        data: {
          idUsuario: 3,
          idCategoria: 1,
          nombre: "X-Man Tornado V3 M Standard 3x3",
          descripcion: "El X-Man Tornado V3 M es el nuevo speedcube insignia 3x3 de QiYi. Este rompecabezas tiene un rendimiento increíble y una fácil personalización. X-man ha lanzado 3 versiones, introduciendo imanes centrales y tecnología maglev en la línea Tornado. Resuelve algunos pequeños problemas que estaban presentes en el V2, como reemplazar los remaches con tornillos y permitir que las tapas centrales encajen desde cualquier orientación.",
          precio: 25,
          cantidad: 100,
          estado: Estado.NUEVO,
          atributos: {
              connect: [{ id: 1 }, { id: 4 }]  
          },
          // preguntas: {
          //     connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
          // },
          // atributos: {
          //     connect: [{ id: 1 }] 
          // },
          // facturas: {
          //     connect: [{ id: 1 }] 
          // }
        }, 
      });
      await prisma.producto.create({
        //1
        data: {
      idUsuario: 3,
      idCategoria: 2,
      nombre: "DNM-37",
      descripcion: "DNM-37 es un lubricante para piezas a base de agua diseñado por Cubicle Labs que crea una explosión de velocidad refrescante y duradera para sus rompecabezas. Este lubricante está especialmente formulado para absorber y retener la humedad del aire, lo que le permite mantener su eficacia durante un largo período de tiempo. DNM-37 ha sido diseñado para funcionar bien en rompecabezas de todos los tamaños, incluidos minxes, square-1s y big cubes.",
      precio: 10,
      cantidad: 50,
      estado: Estado.NUEVO,
      atributos: {
          connect: [{ id: 6 },{ id: 9 }] 
      },
      // preguntas: {
      //     connect: [{ id: 3 }]
      // },
      // atributos: {
      //     connect: [{ id: 2 }] 
      // },
      // facturas: {
      //     connect: [{ id: 2 }, { id: 4 }] 
      // }
  },  
      });
      await prisma.producto.create({
        //1
        data: {
          idUsuario: 3,
          idCategoria: 3,
          nombre: "SpeedStacks Gen4 Mat (Voxel Glow)",
          descripcion: "The SpeedStacks Gen4 Mat is a comfortable, soft surface that features latches to mount onto the StackMat Pro Timer Gen4. Its compact form factor makes it ideal for use on smaller tables.",
          precio: 15,
          cantidad: 10,
          estado: Estado.NUEVO,
          atributos: {
              connect: [{ id: 11}] 
          },
          // preguntas: {
          //     connect: [{ id: 4 }]
          // },
          // atributos: {
          //     connect: [{ id: 3}] 
          // },
          // facturas: {
          //     connect: [{ id: 3 }, { id: 5 }] 
          // }
        },  
      });
      await prisma.producto.create({
        //1
        data: {
          idUsuario: 5,
          idCategoria: 1,
          nombre: "MoYu AoSu 4x4 WR M",
          descripcion: "El MoYu AoSu 4x4 WR M es el sucesor del exitoso MoYu AoSu GTS2 M. ¡Este cubo de velocidad magnético 4x4 presenta un tamaño nuevo, más pequeño y más controlable de 59 mm, así como un sistema de posicionamiento actualizado y nuevos tonos brillantes sin calcomanías!",
          precio: 40,
          cantidad: 25,
          estado: Estado.NUEVO,
          atributos: {
              connect: [{ id: 2 }]  
          },
        },   
      });
      await prisma.producto.create({
        //1
        data: {
          idUsuario: 5,
          idCategoria: 1,
          nombre: "MoYu AoChuang 5x5 GTS M",
          descripcion: "El MoYu AoChuang 5x5 GTS M es un cubo de velocidad 5x5 relativamente rápido y burbujeante con capas exteriores más grandes para un escenario 3x3 más cómodo. Esta versión viene magnetizada de fábrica y tiene una sensación magnética media.",
          precio: 50,
          cantidad: 2,
          estado: Estado.USADO_BUEN_ESTADO,
          atributos: {
              connect: [{ id: 3 }]  
          },
      },    
      });
      await prisma.producto.create({
        //1
        data: {
          idUsuario: 5,
          idCategoria: 1,
          nombre: "YuXin Little Magic 3x3",
          descripcion: "El YuXin Little Magic 3x3 es un nuevo cubo de velocidad económico de 3x3x3 de YuXin. Ligero, con un diseño avanzado y un exterior esmerilado, el YuXin Little Magic 3x3 se parece a los cubos de velocidad más caros. A pesar de su precio económico, el Little Magic 3x3 se destaca como un excelente cubo de velocidad tanto para principiantes como para cubos avanzados.",
          precio: 9,
          cantidad: 10,
          estado: Estado.NUEVO,
          atributos: {
              connect: [{ id: 1 }]  
          },
      },    
      });
      await prisma.producto.create({
        //1
        data: {
          idUsuario: 3,
          idCategoria: 2,
          nombre: "Cubicle Labs Mystic",
          descripcion: "¡Suave Y Rápido! Cubicle Labs Mystic es el primer lubricante para cubos a base de plantas del mundo. Utilizando la lubricidad única del aloe, Mystic crea una experiencia viva y rápida que puede ver, sentir y escuchar.",
          precio: 5,
          cantidad: 100,
          estado: Estado.NUEVO,
          atributos: {
              connect: [{ id: 6 }, { id: 9 }]  
          },
      },    
      });
      await prisma.producto.create({
        //1
        data: {
          idUsuario: 3,
          idCategoria: 1,
          nombre: "YJ MGC 4x4",
          descripcion: "El MGC 4x4 es un nuevo cubo magnético de velocidad 4x4 de YJ. Este rompecabezas ofrece un rendimiento emblemático a una fracción del precio de un buque insignia. Presenta un giro suave y una sensación magnética media.",
          precio: 25,
          cantidad: 10,
          estado: Estado.NUEVO,
          atributos: {
              connect: [{ id: 1 }, { id: 5 }]  
          },
      },    
      });
      await prisma.producto.create({
        //1
        data: {
          idUsuario: 5,
          idCategoria: 3,
          nombre: "StackMat Pro Timer Gen4",
          descripcion: "The StackMat Pro Timer Gen4 features a curved design with touch tensors that tilt towards the middle of the timer. It uses AAA batteries (included with the timer, please remove the plastic strip in the battery compartment to begin using the timer).",
          precio: 30,
          cantidad: 34,
          estado: Estado.USADO_ACEPTABLE,
          atributos: {
              connect: [{ id: 12 }, { id: 14 }]  
          },
      },    
      });
      await prisma.orden.createMany({
        data: ordenes 
      });
      await prisma.ordenProducto.createMany({
        data: ordenproductos 
      });
      await prisma.pregunta.createMany({
        data: preguntas
      });
      await prisma.respuesta.createMany({
        data: respuestas
      });
      await prisma.factura.createMany({
        data: facturas
      });
      await prisma.facturaProducto.createMany({
        data: facturaproductos
      });
      await prisma.evaluacion.createMany({
        data: evaluaciones
      });      
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
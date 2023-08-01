import { PrismaClient } from '@prisma/client';
import { usuarios } from './seeds/usuarios';
import { categorias } from './seeds/categorias';
import { direcciones } from './seeds/direcciones';
import { evaluaciones } from './seeds/evaluaciones';
import { facturas } from './seeds/facturas';
import { nombreatributos } from './seeds/nombreatributo';
import { valoratributos } from './seeds/valoratributo';
import { facturaproductos } from './seeds/facturaproductos';
import { preguntas } from './seeds/preguntas';
import { productos } from './seeds/productos';
import { respuestas } from './seeds/respuestas';
import { tarjetas } from './seeds/tarjetas';

const prisma = new PrismaClient();

async function main() {
    await prisma.usuario.createMany({
        data: usuarios
      });   
      await prisma.tarjeta.createMany({
        data: tarjetas
      });  
      await prisma.direccion.createMany({
        data: direcciones 
      });
      await prisma.categoria.createMany({
        data: categorias
      });
      await prisma.producto.createMany({
        data: productos
      });
      await prisma.pregunta.createMany({
        data: preguntas
      });
      await prisma.respuesta.createMany({
        data: respuestas
      });
      await prisma.nombreAtributo.createMany({
        data: nombreatributos
      });
      await prisma.valorAtributo.createMany({
        data: valoratributos
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
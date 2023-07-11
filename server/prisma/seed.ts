import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    await prisma.usuario.create({
        //Instancia de videojuego 1
        data: {
            idTipoUsuario: 2,
            nombre: 'Andrés Hernández',
            correo: 'ahernandez20910@gmail.com',
            telefono: '85599103',
            clave: 'andres20',
            tipoUsuario: 'ADMIN'
        }
    });

    await prisma.direccion.create({
        //Instancia de videojuego 1
        data: {
            provincia: "Alajuela",
            canton: 'Alajuela',
            distrito: 'Carrizal',
            direccionExacta: 'mi dick',
            codigoPostal: '00000',
            telefono: '24831292',
            idUsuario: 1
        }
    });

    await prisma.tarjeta.create({
        //Instancia de videojuego 1
        data: {
            idUsuario: 1,
            tipo: 'DEBITO',
            proveedor: 'MasterCard',
            nombre: 'Andrés Hernández',
            numero: '8988848615305001'
        }
    });

    await prisma.factura.create({
        //Instancia de videojuego 1
        data: {
            idUsuario: 1,
            idDireccion: 1,
            idTarjeta: 1,
            total: 12
        }
    });

    await prisma.factura.create({
        //Instancia de videojuego 1
        data: {
            idUsuario: 1,
            idDireccion: 1,
            idTarjeta: 1,
            total: 125
        }
    });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
  });
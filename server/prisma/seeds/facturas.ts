import { Pedido } from "@prisma/client";

export const facturas = [
    //1
    {
        idUsuario: 1,
        idDireccion: 1,
        idTarjeta: 1,
        total: 35,
        estado: Pedido.FINALIZADO,
    },
    {
        idUsuario: 1,
        idDireccion: 2,
        idTarjeta: 2,
        total: 15,
        estado: Pedido.FINALIZADO,
    },
    {
        idUsuario: 2,
        idDireccion: 1,
        idTarjeta: 1,
        total: 10,
        estado: Pedido.EN_PROGRESO,
    },
    {
        idUsuario: 4,
        idDireccion: 1,
        idTarjeta: 1,
        total: 15,
        estado: Pedido.FINALIZADO,
    },
  ];
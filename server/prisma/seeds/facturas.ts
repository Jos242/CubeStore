import { Pedido } from "@prisma/client";

export const facturas = [
    //1
    {
        idUsuario: 1,
        idDireccion: 1,
        idTarjeta: 1,
        total: 10000.0,
        estado: Pedido.FINALIZADO,
    },
    {
        idUsuario: 1,
        idDireccion: 2,
        idTarjeta: 2,
        total: 6000,
        estado: Pedido.FINALIZADO,
    },
    {
        idUsuario: 2,
        idDireccion: 1,
        idTarjeta: 1,
        total: 5000,
        estado: Pedido.EN_PROGRESO,
    },
    {
        idUsuario: 4,
        idDireccion: 1,
        idTarjeta: 1,
        total: 6000,
        estado: Pedido.FINALIZADO,
    },
  ];
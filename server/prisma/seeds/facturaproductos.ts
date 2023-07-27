import { Pedido } from "@prisma/client";

export const facturaproductos = [
    //1
    {
        idFactura: 1,
        idProducto: 1,
        cantidad: 1,
        estado: Pedido.FINALIZADO,
    },
    {
        idFactura: 1,
        idProducto: 2,
        cantidad: 3,
        estado: Pedido.FINALIZADO,
    },
    {
        idFactura: 2,
        idProducto: 3,
        cantidad: 1,
        estado: Pedido.FINALIZADO,
    },
    {
        idFactura: 3,
        idProducto: 2,
        cantidad: 4,
        estado: Pedido.EN_PROGRESO,
    },
    {
        idFactura: 4,
        idProducto: 3,
        cantidad: 1,
        estado: Pedido.FINALIZADO,
    },

    {
        idFactura: 5,
        idProducto: 4,
        cantidad: 1,
        estado: Pedido.FINALIZADO,
    },
    {
        idFactura: 5,
        idProducto: 5,
        cantidad: 2,
        estado: Pedido.FINALIZADO,
    },
    {
        idFactura: 6,
        idProducto: 5,
        cantidad: 1,
        estado: Pedido.FINALIZADO,
    },
    {
        idFactura: 7,
        idProducto: 4,
        cantidad: 1,
        estado: Pedido.FINALIZADO,
    },
];
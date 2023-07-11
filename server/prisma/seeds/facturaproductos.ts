import { Pedido } from "@prisma/client";

export const facturaproductos = [
    //1
    {
        idFactura: 1,
        idProducto: 1,
        estado: Pedido.FINALIZADO,
    },
    {
        idFactura: 1,
        idProducto: 2,
        estado: Pedido.FINALIZADO,
    },
    {
        idFactura: 2,
        idProducto: 3,
        estado: Pedido.FINALIZADO,
    },
    {
        idFactura: 3,
        idProducto: 2,
        estado: Pedido.EN_PROGRESO,
    },
    {
        idFactura: 4,
        idProducto: 3,
        estado: Pedido.FINALIZADO,
    },
];
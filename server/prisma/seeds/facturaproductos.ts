import { Pedido } from "@prisma/client";

export const facturaproductos = [
    //1
    {
        idFactura: 1,
        idProducto: 1,
        cantidad: 1,
        estado: Pedido.ENTREGADO,
    },
    {
        idFactura: 1,
        idProducto: 2,
        cantidad: 3,
        estado: Pedido.ENTREGADO,
    },
    {
        idFactura: 2,
        idProducto: 3,
        cantidad: 1,
        estado: Pedido.ENTREGADO,
    },
    {
        idFactura: 3,
        idProducto: 2,
        cantidad: 4,
        estado: Pedido.PENDIENTE,
    },
    {
        idFactura: 4,
        idProducto: 3,
        cantidad: 1,
        estado: Pedido.ENTREGADO,
    },

    {
        idFactura: 5,
        idProducto: 4,
        cantidad: 1,
        estado: Pedido.ENTREGADO,
    },
    {
        idFactura: 5,
        idProducto: 5,
        cantidad: 2,
        estado: Pedido.ENTREGADO,
    },
    {
        idFactura: 6,
        idProducto: 5,
        cantidad: 1,
        estado: Pedido.ENTREGADO,
    },
    {
        idFactura: 7,
        idProducto: 4,
        cantidad: 1,
        estado: Pedido.ENTREGADO,
    },
];
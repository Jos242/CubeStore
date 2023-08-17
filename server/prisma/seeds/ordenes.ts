import { Pedido } from "@prisma/client";
export const ordenes = [
    //1
    {
        idUsuario: 1,
        subtotal: 75,
        estado: Pedido.CARRITO,
    },
    {
        idUsuario: 2,
        subtotal: 150,
        estado: Pedido.CARRITO,
    },
    {
        idUsuario: 4,
        subtotal: 50,
        estado: Pedido.CARRITO,
    },

];
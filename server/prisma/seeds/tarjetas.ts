import { TipoPago } from "@prisma/client";

export const tarjetas = [
    //1
    {
        idUsuario: 1,
        tipo: TipoPago.DEBITO,
        proveedor: "Visa",
        nombre: "Jose Mora",
        numero: "1234567890",
        fechaExp: new Date(2024, 1, 1),
    }, 
    {
        idUsuario: 1,
        tipo: TipoPago.CREDITO,
        proveedor: "MasterCard",
        nombre: "Jose Mora",
        numero: "0987654321",
        fechaExp: new Date(2025, 1, 1),
    },
    {
        idUsuario: 2,
        tipo: TipoPago.CREDITO,
        proveedor: "MasterCard",
        nombre: "Eduardo Alvarado",
        numero: "0000111122",
        fechaExp: new Date(2025, 1, 1),
    },
    {
        idUsuario: 4,
        tipo: TipoPago.DEBITO,
        proveedor: "Visa",
        nombre: "Andres Hernandez",
        numero: "1111111111",
        fechaExp: new Date(2024, 1, 1),
    },
];
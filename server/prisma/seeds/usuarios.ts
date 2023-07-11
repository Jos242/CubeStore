import {TipoUsuario } from "@prisma/client";
export const usuarios = [
    //1
    {
        idTipoUsuario: 1,
        nombre:    "Jose Mora",
        correo:    "jose1andres1ml@gmail.com",
        telefono:  "84242002",
        clave:    "123456",
        tipoUsuario: TipoUsuario.ADMIN,
        // direcciones: {
        //     connect: [{ id: 1 }, { id: 2 }]
        // },
        // facturas: {
        //     connect: [{ id: 1 }, { id: 2 }]
        // },
        // evaluaciones: {
        //     connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
        // },
        // preguntas: {
        //     connect: [{ id: 1 }, { id: 3 }]
        // },
        // respuestas: {
        //     connect: [{ id: 4 }]
        // },
        // tarjetas: {
        //     connect: [{ id: 1 }, { id: 2 }]
        // },
    },
    {
        idTipoUsuario: 2,
        nombre:    "Eduardo Alvarado",
        correo:    "eduardo@gmail.com",
        telefono:  "12345678",
        clave:    "123456",
        tipoUsuario: TipoUsuario.CLIENTE,
        // direcciones: {
        //     connect: [{ id: 3 }]
        // },
        // facturas: {
        //     connect: [{ id: 3 }]
        // },
        // evaluaciones: {
        //     connect: [{ id: 4 }]
        // },
        // preguntas: {
        //     connect: [{ id: 2 }, { id: 4 }]
        // },
        // respuestas: {
        //     connect: [{ id: 1 }]
        // },
        // tarjetas: {
        //     connect: [{ id: 3 }]
        // },
    },
    {
        idTipoUsuario: 3,
        nombre:    "QiYi Stores",
        correo:    "qiyi@gmail.com",
        telefono:  "87654321",
        clave:    "123456",
        tipoUsuario: TipoUsuario.VENDEDOR,
        // direcciones: {
        //     connect: [{ id: 4 }]
        // },
        // productos: {
        //     connect: [{ id: 1 },{ id: 2 },{ id: 3 }]
        // },
    },
    {
        idTipoUsuario: 2,
        nombre:    "Andres Hernandez",
        correo:    "andres@gmail.com",
        telefono:  "11110000",
        clave:    "123456",
        tipoUsuario: TipoUsuario.CLIENTE,
        // direcciones: {
        //     connect: [{ id: 5 }]
        // },
        // facturas: {
        //     connect: [{ id: 4 }]
        // },
        // evaluaciones: {
        //     connect: [{ id: 4 }]
        // },
        // preguntas: {
        //     connect: [{ id: 2 }, { id: 4 }]
        // },
        // respuestas: {
        //     connect: [{ id: 2 },{ id: 3 }]
        // },
        // tarjetas: {
        //     connect: [{ id: 4 }]
        // },
    },
    {
        idTipoUsuario: 3,
        nombre:    "MoYu Stores",
        correo:    "moyu@gmail.com",
        telefono:  "00001111",
        clave:    "123456",
        tipoUsuario: TipoUsuario.VENDEDOR,
        // direcciones: {
        //     connect: [{ id: 4 }]
        // },
        // productos: {
        //     connect: [{ id: 1 },{ id: 2 },{ id: 3 }]
        // },
    },
  ];
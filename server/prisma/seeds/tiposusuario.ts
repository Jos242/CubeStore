import {TipoUsuario } from "@prisma/client";
export const tiposusuarios = [
    //1
    {
        idUsuario: 1,
        tipoUsuario: TipoUsuario.ADMIN
    },
    {
        idUsuario: 2,
        tipoUsuario: TipoUsuario.CLIENTE
    },
    {
        idUsuario: 3,
        tipoUsuario: TipoUsuario.VENDEDOR
    },
    {
        idUsuario: 4,
        tipoUsuario: TipoUsuario.CLIENTE
    },
    {
        idUsuario: 4,
        tipoUsuario: TipoUsuario.VENDEDOR
    },
    {
        idUsuario: 5,
        tipoUsuario: TipoUsuario.VENDEDOR
    },
  ];